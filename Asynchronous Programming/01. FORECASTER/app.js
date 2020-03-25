(() => {
    const BASE_URL = "https://judgetests.firebaseio.com/locations.json";
    const WEATHER_URL = "https://judgetests.firebaseio.com/forecast/{status}/{code}.json";

    const elements = {
		button: document.querySelector("#submit"),
        button: document.querySelector("#submit"),
        currentDiv: document.querySelector('#current'),
        upcomingDiv: document.querySelector('#upcoming'),
		locationInput: document.querySelector("#location"),
        forecastWrapper: document.querySelector('#forecast'),
        upcomingContainer: document.querySelector('#upcoming'),
		notificationHeading: document.querySelector('h1.notification')
    };

    const weatherSymbols = {
        "s": "☀",
        "p": "⛅",
        "o": "☁",
        "r": "☂",
        "d": "°"
    };

    const errorHandler = () => {
        console.log('Something went wrong!');

    };

    const jsonMiddleware = (r) => r.json();

    elements.button.addEventListener("click", getLocationValue);

    function getLocationValue() {
        const location = elements.locationInput.value;

        fetch(BASE_URL)
            .then(jsonMiddleware)
            .then((data) => {
                const { name, code } = data.find((o) => o.name === location);

                const CURRENT_TODAY_URL = WEATHER_URL.replace('{status}/{code}', `today/${code}`);
                const CURRENT_UPCOMING_URL = WEATHER_URL.replace('{status}/{code}', `upcoming/${code}`);

                Promise.all([
                        fetch(CURRENT_TODAY_URL).then(jsonMiddleware),
                        fetch(CURRENT_UPCOMING_URL).then(jsonMiddleware)
                    ])
                    .then(showWeatherLocation)
                    .catch(errorHandler)
            })
            .catch(errorHandler)
    }

    function showWeatherLocation([todayData, upcomingData]) {
        const { condition, high, low } = todayData.forecast;

        let forecastsDiv = createHTMLElement('div', ['forecasts']);
        let symbolSpan = createHTMLElement('span', ['condition', 'symbol'], weatherSymbols[condition[0].toLowerCase()]);
        let conditionSpan = createHTMLElement('span', ['condition']);

        let forecastFirstDataSpan = createHTMLElement('span', ['forecast-data'], todayData.name);

        let degreesInfo = `${low}${weatherSymbols.d}/${high}${weatherSymbols.d}`;
        let forecastSecondDataSpan = createHTMLElement('span', ['forecast-data'], degreesInfo);

        let forecastThirdDataSpan = createHTMLElement('span', ['forecast-data'], condition);

        conditionSpan.appendChild(forecastFirstDataSpan);
        conditionSpan.appendChild(forecastSecondDataSpan);
        conditionSpan.appendChild(forecastThirdDataSpan);

        forecastsDiv.appendChild(symbolSpan);
        forecastsDiv.appendChild(conditionSpan);

        elements.currentDiv.appendChild(forecastsDiv);
        elements.forecastWrapper.style.display = "block";

        upcomingWeather(upcomingData);
    }

    function upcomingWeather({ forecast, name }) {
        let forecastDiv = createHTMLElement('div', ['forecast-info']);

        forecast.forEach(({ condition, high, low }) => {
            let containerSpan = createHTMLElement('span', ['upcoming']);

            let degreesInfo = `${low}${weatherSymbols.d}/${high}${weatherSymbols.d}`;

            let firstDataSpan = createHTMLElement('span', ['forecast-data'], weatherSymbols[condition[0].toLowerCase()]);
            let secondDataSpan = createHTMLElement('span', ['forecast-data'], degreesInfo);
            let thirdDataSpan = createHTMLElement('span', ['forecast-data'], condition);


            containerSpan.appendChild(firstDataSpan);
            containerSpan.appendChild(secondDataSpan);
            containerSpan.appendChild(thirdDataSpan);

            forecastDiv.appendChild(containerSpan);
        });

        elements.upcomingContainer.appendChild(forecastDiv);
    }
})();

function createHTMLElement(tagName, classNames, textContent) {
    let element = document.createElement(tagName);

    if (classNames) {
        element.classList.add(...classNames);
    }

    if (textContent) {
        element.textContent = textContent;
    }

    return element;
}