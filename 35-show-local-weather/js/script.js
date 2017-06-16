const DOM = {
    $currentSummary: $('.current__summary'),
    $currentLocation: $('.current__location'),
    $currentTemp: $('.current__temp'),
    $currentImage: $('.current'),
    $nextAllForecast: $('#next__allForecasts'),
}

// Display current weather forecast
function showCurrentWeather(report, location) {
    DOM.$currentSummary.text(`${report.currently.summary}`);
    DOM.$currentLocation.text(`${location.city}`);
    DOM.$currentTemp.text(`${report.currently.temperature.toFixed()}`);
    DOM.$currentImage.css('background-image', `url(imgs/current/${report.currently.icon}.jpg)`);
}

// Display weather forecast for the following days
function showNextWeather(report) {
    let forecast = '';

    // Convert weekday from number to text
    function unixDay(time) {
        const weekdayText = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const now = new Date(time * 1000);
        const weekday = now.getDay();

        return weekdayText[weekday];
    }

    for (let i = 1; i < report.daily.data.length - 4; i++) {
        console.log(report.daily.data[i]);

        forecast += `<li class="next__forecast">
                        <span class="next__weekday">${unixDay(report.daily.data[i].time)}</span>
                        <span class="next__weatherIcon">
                            <img src="imgs/icons/${report.daily.data[i].icon}.svg">
                        </span>
                        <span class="next__maxTemp">${report.daily.data[i].temperatureMax.toFixed()}°</span>
                        <span class="next__minTemp">${report.daily.data[i].temperatureMin.toFixed()}°</span>
                    </li>`;
    }

    DOM.$nextAllForecast.html(forecast);
}

// Weather report controller
function getWeatherReport(location) {
    const loc = location.loc.split(',');
    const latitude = loc[0];
    const longitude = loc[1];
    const urlWeather = `https://api.darksky.net/forecast/693ff09c194f926ca1eb19e280cc566d/${latitude},${longitude}?units=si&callback=?`;

    $.getJSON(urlWeather, (report) => {
        console.log(report);
        showCurrentWeather(report, location);
        showNextWeather(report);
    });
}

function getIpAddress() {
    $.getJSON('https://ipinfo.io/json?callback=?', (location) => {
        console.log(location);
        getWeatherReport(location);
    });
}

$(window).on('load', getIpAddress);
