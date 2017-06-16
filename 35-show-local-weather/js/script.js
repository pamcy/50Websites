const DOM = {
    $currentSummary: $('.current__summary'),
    $currentLocation: $('.current__location'),
    $currentTemp: $('.current__temp'),
    $currentImage: $('.current'),
    $nextAllForecast: $('#next__allForecasts'),
    $switchButton: $('#current__checkbox'),
}

// Display weather reports
const getWeatherReport = {
    showCurrent(report, location) {
        DOM.$currentSummary.text(`${report.currently.summary}`);
        DOM.$currentLocation.text(`${location.city}`);
        DOM.$currentTemp.text(`${report.currently.temperature.toFixed()}`);
        DOM.$currentImage.css('background-image', `url(imgs/current/${report.currently.icon}.jpg)`);
    },

    showNext(report) {
        let forecast = '';

        // Convert weekday from unix number to text
        function unixDay(time) {
            const weekdayText = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const now = new Date(time * 1000);
            const weekday = now.getDay();

            return weekdayText[weekday];
        }

        for (let i = 1; i < report.daily.data.length - 4; i += 1) {
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
    },
}

// Weather report controller
function weatherController(location) {
    const unit = DOM.$switchButton.prop('checked') ? 'si' : 'us';
    const loc = location.loc.split(',');
    const latitude = loc[0];
    const longitude = loc[1];
    const urlWeather = `https://api.darksky.net/forecast/693ff09c194f926ca1eb19e280cc566d/${latitude},${longitude}?units=${unit}&callback=?`;

    // Get weather data from Dark Sky
    $.getJSON(urlWeather, (report) => {
        // console.log(report);
        getWeatherReport.showCurrent(report, location);
        getWeatherReport.showNext(report);
    });
}

// Initialize
function init() {
    const urlIP = 'https://ipinfo.io/json?callback=?';

    // Get IP Location
    $.getJSON(urlIP, (location) => {
        weatherController(location);
    });

    $(window).on('load', init);
    DOM.$switchButton.on('change', init);
}

init();
