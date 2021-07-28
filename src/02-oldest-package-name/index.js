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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

const { default: axios } = require("axios");

module.exports = async function oldestPackageName() {

  return axios.get("https://api.npms.io/v2/search/suggestions?q=react", {})
  .then((response) => {
    
    let packages = response.data;
    let allDatesArray = [];

    packages.forEach(pkg => {
      let currentDate = pkg.package.date;
      allDatesArray.push(Date.parse(currentDate));
    });

    let oldestPackageObject = packages.find(pkg => Date.parse(pkg.package.date) == allDatesArray.sort()[0]);

    return oldestPackageObject.package.name;

  });

};


