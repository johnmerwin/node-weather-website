const request = require("request");

var geoCodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=YslAuAABgSIXAFM4kDtCVudxoKA8snR6&location=${encodedAddress}`;
  request(
    {
      url: geocodeUrl,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Error in API", undefined);
        //console.log("Error in API");
      } else if (body) {
        if (body.info.statuscode === 0) {
          // Property destructuring of body object
          const {
            street,
            adminArea5,
            adminArea3,
            postalCode,
            adminArea1
          } = body.results[0].locations[0];

          // Formatted address
          var formattedAddress = `${street},${adminArea5},${adminArea3},${postalCode},${adminArea1}`;

          const { lat, lng } = body.results[0].locations[0].latLng;
          callback(undefined, {
            address: formattedAddress,
            latitude: lat,
            longitude: lng
          });
        }
      } else {
        callback("Unable to find that address", undefined);
      }
    }
  );
};

module.exports = {
  geoCodeAddress
};
