const needle = require('needle');

const fetchMyIP = function() {
  return needle('get','https://api.ipify.org?format=json')
    .then((response) => {
      const body = response.body; // retrieve the body value from the response object
      const ip = body.ip; // retrieve the ip from the body object
      return ip;
    });
};

const fetchCoordsByIP = function(ip) {
  return needle('get', `http://ipwho.is/42`)//${ip}`)
  .then((response) => {
    const body = response.body; //retrieve body from response
    const latitude = body.latitude; // retrieve latitude from body
    const longitude = body.longitude; // retrieve longitude from body
    return {latitude, longitude};
  });
};

const fetchISSFlyOverTimes = function(coords) {  
  return needle(`get`, `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
  .then((response) => {
    let passTimes = response.body.response;
    return passTimes;
  });
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((passTimes) => {
      return passTimes});
}

module.exports = { nextISSTimesForMyLocation };