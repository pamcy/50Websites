const DOM = {
    $currentSummary: $('.current__summary'),
    $currentLocation: $('.current__location'),
    $currentTemp: $('.current__temp'),
    $currentImage: $('.current'),
}

function showCurrentWeather(report, location) {
    DOM.$currentSummary.text(`${report.currently.summary}`);
    DOM.$currentLocation.text(`${location.city}`);
    DOM.$currentTemp.text(`${report.currently.temperature.toFixed()}`);
    DOM.$currentImage.css('background', `url(./../imgs/current/${report.currently.icon}.jpg)`);
}

function getWeatherReport(location) {
    const urlWeather = `https://api.darksky.net/forecast/693ff09c194f926ca1eb19e280cc566d/${location.lat},${location.lon}?units=si&callback=?`;

    $.getJSON(urlWeather, (report) => {
        console.log(report);

        showCurrentWeather(report, location);
    });
}

function getIpAddress() {
    $.getJSON('http://ip-api.com/json/?callback=?', (location) => {
        console.log(location);
        getWeatherReport(location);
    });
}

$(window).on('load', getIpAddress);
