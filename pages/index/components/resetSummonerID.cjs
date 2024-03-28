const fs = require('fs');
const https = require('https');
const path = require('path');
const JSON_PATH = path.join(__dirname, 'playerListOUO.json');

const API_KEY = 'RGAPI-ca1c47e9-374c-45f8-bd03-20a9195cf36e';
const BASE_URL_ACCOUNTS = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/`;
const BASE_URL_SUMMONER = `https://tw2.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/`;

function fetchId(gameName, tagLine) {
  return new Promise((resolve, reject) => {
    https
      .get(
        `${BASE_URL_ACCOUNTS}${gameName}/${tagLine}?api_key=${API_KEY}`,
        (resp) => {
          let data = '';

          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => {
            resolve(JSON.parse(data).puuid);
          });
        }
      )
      .on('error', (err) => {
        reject(err);
      });
  });
}

function fetchSummonerId(puuid) {
  return new Promise((resolve, reject) => {
    https
      .get(`${BASE_URL_SUMMONER}${puuid}?api_key=${API_KEY}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            if (parsedData.id) {
              resolve(parsedData.id);
            } else {
              reject(new Error('Summoner ID not found'));
            }
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

async function updateIdForTeam(team) {
  for (let player of team) {
    try {
      const puuid = await fetchId(player.gameName, player.tagLine);
      player.puuid = puuid;

      const summonerId = await fetchSummonerId(puuid);
      player.id = summonerId;
    } catch (error) {
      console.log(`Error fetching ID for ${player.gameName}:`, error);
    }
  }
}

async function updateAllIds(jsonData) {
  const teams = Object.values(jsonData);
  for (let team of teams) {
    await updateIdForTeam(team);
  }
  return jsonData;
}

fs.readFile(JSON_PATH, 'utf8', async (err, jsonString) => {
  if (err) {
    console.log('Error reading file from disk:', err);
    return;
  }
  try {
    const jsonData = JSON.parse(jsonString);
    const updatedData = await updateAllIds(jsonData);

    fs.writeFile(JSON_PATH, JSON.stringify(updatedData, null, 2), (err) => {
      if (err) console.log('Error writing updated data to file:', err);
      else console.log('JSON file updated successfully!');
    });
  } catch (err) {
    console.log('Error parsing JSON string:', err);
  }
});
