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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

const { default: axios } = require("axios");

module.exports = async function organiseMaintainers() {

  return axios.get("https://api.npms.io/v2/search/suggestions?q=react", {})
  .then((response) => {

    let usernamesArray = [];
    
    //collects all usernames
    let packages = response.data;
    packages.forEach(pkg => {
      pkg.package.maintainers.forEach(maintainer => {
        usernamesArray.push(maintainer.username);
      });
    });

    //removes username duplicates
    let usernamesArrayNoDupes = [];
    usernamesArray.forEach(username => {
      if (!usernamesArrayNoDupes.includes(username)) {
        usernamesArrayNoDupes.push(username);
      }
    });
    usernamesArrayNoDupes = usernamesArrayNoDupes.sort();

    // populates return array
    let result = [];
    usernamesArrayNoDupes.forEach(user => {
      let usernameObject = {};

      usernameObject.username = user;
      usernameObject.packageNames = [];
       
      packages.forEach(pkg => {
        pkg.package.maintainers.forEach(maintainer => {
          if (maintainer.username == user) {
            usernameObject.packageNames.push(pkg.package.name);
          };
        });

      });
      usernameObject.packageNames = usernameObject.packageNames.sort();
      result.push(usernameObject);
    });

    return result;

  });

};






