const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log("It didn't work! Error: Success status was false. Server message says:" ,error);
      return;
    }

    console.log('It worked! GeoLocation:' , data);
    fetchISSFlyOverTimes(data, (error, data) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      
      console.log(data);
    });
  });
});