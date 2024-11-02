const needle = require('needle');

const nextISSTimesForMyLocation = function(callback) {
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log("It didn't work! Error: Success status was false. Server message says:" ,error);
      return;
    }

    fetchISSFlyOverTimes(data, (error, data) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      callback(null, data);
      return;
    });
  });
});
}

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
  let result = [];

  needle.get(`${url}`, (error, response) => {
    if (error !== null) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {      
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    } else {
      for (let date of response.body.response) {
        let passTime = new Date(date.risetime * 1000);
        dateString = passTime.toGMTString();
        result.push(`Next pass at ${dateString} for ${date.duration} seconds`);
      }
      callback(null, result);
    }
  });
};

module.exports = { nextISSTimesForMyLocation };