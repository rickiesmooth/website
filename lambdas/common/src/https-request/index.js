const https = require("https");

module.exports = async function(options, body) {
  return new Promise(function(resolve, reject) {
    let data = "";
    const req = https.request(options, res => {
      res.on("data", d => {
        data += d;
      });

      res.on("end", () => resolve(data));
    });

    req.on("error", error => {
      reject(error);
    });

    req.write(body);
    req.end();
  });
};
