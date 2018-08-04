const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
	.options({
		address: {
			describe: 'Location to fetch weather for',
			demand: true,
			alias: 'a',
			string: true,
		},
	})
	.help()
	.alias('help', 'h').argv;

geocode.getLocation(argv.address, (err, results) => {
	if (err) {
		console.log('err', err);
		return err;
	}

	return weather.getWeather(
		{ latitude: results.latitude, longitude: results.longitude },
		(err, weatherResults) => {
			if (err) {
				console.log(err);
				return err;
			}
			console.log(
				`It's currently ${weatherResults.temperature} degrees in ${
					results.address
				}. It feels like ${weatherResults.apparentTemperature} degrees tho...`
			);
		}
	);
});
