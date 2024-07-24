// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useLiveStreamers = () => {
//   const [liveStreamers, setLiveStreamers] = useState([]);

//   useEffect(() => {
//     const fetchLiveData = async () => {
//       try {
//         const response = await axios.get('/api/fetchTwitchLive');
//         const liveNames = response.data.filter(item => item && item.streamerName)
//           .map(item => item.streamerName);
//         setLiveStreamers(liveNames);
//       } catch (error) {
//         console.error('Error fetching live stream data:', error);
//       }
//     };
//     fetchLiveData();
//   }, []);

//   return liveStreamers;
// };

// export default useLiveStreamers;