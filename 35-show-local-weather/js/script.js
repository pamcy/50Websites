function getWeatherReport (location) {
    const urlWeather = `https://api.darksky.net/forecast/693ff09c194f926ca1eb19e280cc566d/${location.latitude},${location.longitude}?units=si&callback=?`;

    $.getJSON(urlWeather, function(reports) {
        console.log(reports);
    });
}

$.getJSON('https://freegeoip.net/json/?callback=?', function (location) {
    console.log(location);
    getWeatherReport(location);
});

// let data = {
//     key: '693ff09c194f926ca1eb19e280cc566d',
//     latitude: '',
//     longitude: '',
//     units: 'si',
// };

// const url = `https://api.darksky.net/forecast/${data.key}/37.8267,-122.4233?callback=?`;

// function getWeather(infos) {
//     console.log(infos);
//     $('body').html(`${infos.daily.icon} <p>The temperature is ${infos.daily.data[0].temperatureMin}</p>`);
// }

// $.getJSON(url, data, getWeather);


// let getLocation = function () {
//     const apiAddress = 'http://ip-api.com/json/?callback=?';

//     $.getJSON(apiAddress)
//         .done(function (location) {
            
//         });
// }

// getLocation();











