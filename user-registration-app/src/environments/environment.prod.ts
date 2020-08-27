export const environment = {
  production: true,
  api_url: "https://api.hackpsu.org/v1/",
  api_v2_url: "https://api.hackpsu.org/v2/",
  socket_url: "https://api.hackpsu.org",
  firebase: {
    apiKey: "AIzaSyCpvAPdiIcqKV_NTyt6DZgDUNyjmA6kwzU",
    authDomain: "hackpsu18.firebaseapp.com",
    databaseURL: "https://hackpsu18.firebaseio.com",
    projectId: "hackpsu18",
    storageBucket: "hackpsu18.appspot.com",
    messagingSenderId: "1002677206617",
  },

  //Note: Months are indexed at 0
  liveWebsiteGuardTime: new Date(2020, 10, 4, 15),
  hackathonStartTime: new Date(2020, 10, 7, 16),
  timerStartTime: new Date(2020, 10, 7, 18),
  hackathonEndTime: new Date(2020, 10, 8, 20),
  rsvpStartTime: new Date(2019, 10),
};
