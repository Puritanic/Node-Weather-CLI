const request = require('request');

module.exports.getLocation = (address, callback) => {
	const encodedAddress = encodeURIComponent(address);

	return request(
		{
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
			json: true,
		},
		(error, response, body) => {
			if (error) {
				callback('There was a problem with fetching data from Google services...');
			} else if (body.status === 'ZERO_RESULTS') {
				callback('Your search returned no results');
			} else if (body.status === 'OK') {
				callback(undefined, {
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng,
				});
			}
		}
	);
};
