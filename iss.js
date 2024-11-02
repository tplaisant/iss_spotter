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

module.exports = { fetchMyIP };