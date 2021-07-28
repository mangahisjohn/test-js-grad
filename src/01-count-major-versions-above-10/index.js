/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

const { default: axios } = require("axios");

module.exports = async function countMajorVersionsAbove10() {

  var count = 0;

  return axios.get("https://api.npms.io/v2/search/suggestions?q=react", {})
  .then((response) => {
    
    let packages = response.data;

    packages.forEach(pkg => {
      let currentVersion = pkg.package.version.split(".");
      if (parseInt(currentVersion[0]) > 10) {
        count = count + 1;
      };
    });

    return count;

  });
  
};


