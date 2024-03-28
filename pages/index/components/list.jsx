import React from 'react';
import Loading from './loading';
import TierImage from './tierImage';
import useSummonerData from '../hooks/useSummonerData';
import useLiveStreamers from '../hooks/useLiveStreamers';
// import '../style/list.scss'

function List() {
  const api = import.meta.env.VITE_SECRET_KEY;
  const { summonerData, loading } = useSummonerData(api);
  const liveStreamers = useLiveStreamers(api);

  if (loading) {
    return <Loading />
  }
  const style = {
    boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.5)'
  };


  return (
    <div className='justify-center mb-[5vh] w-[90%] m-auto rounded-xl shadow-bg-3d listContainer bg-slate-50/20'>
      {Object.entries(summonerData)
        .map(([teamName, members]) => ({
          teamName,
          members,
          totalPoints: members.reduce((sum, member) => {
            if (['CHALLENGER', 'GRANDMASTER', 'MASTER'].includes(member.tier)) {
              return sum + (member.leaguePoints || 0);
            }
            return sum;
          }, 0)
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map(({ teamName, members, totalPoints }, index) => (
          <div key={teamName} className="m-[2vh] flex shadow-3d items-center">
            <div className="w-1/6 text-2xl font-bold">
              {index + 1}
            </div>
            <div className='w-1/6'>
              <h2 className='text-2xl font-bold m-2 leading-[2.5rem]'>{teamName}</h2>
              <div className='text-lg font-bold'>
                總分：{totalPoints} LP
              </div>
            </div>
            <ul className='flex w-2/3 items-center'>
              {members.map((member, memberIndex) => (
                <li key={memberIndex} className="text-left m-[1vh] p-2 rounded-md h-[20vh] flex flex-col items-center w-[100%] leading-5">
                  <div className='flex flex-col items-center'>
                    <div className="text-2xl font-bold leading-5 p-1 m-1">{member.summonerName}</div>
                    <div className={liveStreamers.includes(`${member.twitchId}`) ? 'visible' : 'invisible'}>
                      <a href={`https://www.twitch.tv/${member.twitchId}`} target="_blank" rel="noopener noreferrer">
                        <button className='animate-heartbeat bg-red-500 text-white font-bold border-none rounded-sm m-1 p-[1px_3px] cursor-pointer shadow-btn-3d'>LIVE</button>
                      </a>
                    </div>
                  </div>
                  <div className='flex items-center m-auto'>
                    <div className="itemPic w-[70px]">
                      <TierImage tier={member.tier} name={member.summonerName} />
                    </div>
                    <div className="text-center text-xl font-bold">
                      <span className="pointNumber">{member.leaguePoints}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );

}

export default React.memo(List);
