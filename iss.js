const needle = require('needle');

const fetchMyIP = function(callback) {
  let url = `https://api.ipify.org?format=json`;

  needle.get(`${url}`, (error, response, body) => {
    if (error !== null) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, response.body.ip);
      return;
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  let url = `http://ipwho.is/${ip}`;

  needle.get(`${url}`, (error, response) => {
    if (error !== null) {
      callback(error, null);
      return;
    } else if (response.body.success === false) {
      console.log(response.body.success);
      callback(`${response.body.message} when fetching for IP ${response.body.ip}` , null);
      return;
    } else {
      callback(null, { latitude: response.body.latitude, longitude: response.body.longitude});
      return;
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  let url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  needle.get(`${url}`, (error, response) => {
    if (error !== null) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      callback(response.body);
      return;
    } else {
      callback(null, response.body.response);
      return;
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };