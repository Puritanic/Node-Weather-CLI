const request = require('request');

module.exports.getWeather = (coords, callback) => {
	const { latitude, longitude } = coords;
	console.log(coords);
	return request(
		{
			url: `https://api.darksky.net/forecast/6a70ec8ed658efa9fb9cc968bc6c7a22/${latitude},${longitude}?units=auto`,
			json: true,
		},
		(error, response, body) => {
			if (error) {
				callback('Unable to connect to DarkSky weather services.');
			} else if (!error && response.statusCode === 200) {
				callback(undefined, {
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.apparentTemperature,
				});
			} else {
				callback('Unable to fetch weather.');
			}
		}
	);
};
