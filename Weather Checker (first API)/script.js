const weatherForm = document.querySelector('form')
const cityInput = document.querySelector('input')
const card = document.querySelector('.weather-condition')
const card2 = document.querySelector('.weather-info')

const APIkey = '759ee2604184c6193cdf30ac181fcaa2'

weatherForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const city = cityInput.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData)
        } catch (error) {
            const strError = `${error}`
            if(strError==='TypeError: Failed to fetch'){
                displayError('No internet connection 📶')
            }
            card2.style.display = 'none';
        }
    }else{
        card.textContent = ''
        const first = document.createElement('p');
        first.classList.add('first');
        first.textContent = 'No City Entered'
        const second = document.createElement('p');
        second.classList.add('second');
        second.textContent = 'use search box to search for city'
        card.appendChild(first);
        card.appendChild(second)
        card2.style.display = 'none';
    }
})

async function getWeatherData(city) {

    const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

    const response = await fetch(APIurl);

    if(!response.ok){
        throw new Error('City not found');
    }

    return await response.json();
    
}

function displayWeatherInfo(data){
    console.log(data)
    card.textContent = '';
    card2.textContent = '';

    const  {
        name: city, 
        main: {temp, humidity, pressure}, 
        sys: {country, sunrise, sunset}, 
        wind: {speed}, 
        weather: [{description, icon, id}]
    } = data;
    
    const cityName = document.createElement('h1');
    cityName.classList.add('city-name');
    cityName.textContent = `${city}, ${country}`;

    const cityTemperature = document.createElement('p');
    cityTemperature.classList.add('temperature');
    cityTemperature.textContent = `${(temp - 273.15).toFixed(1)}°C`;

    const weatherEmoji = document.createElement('p');
    const image = document.createElement('img');
    image.src = getWeatherEmoji(id);
    weatherEmoji.classList.add('weather');
    weatherEmoji.appendChild(image);

    const weatherDescription = document.createElement('p');
    weatherDescription.classList.add('description');
    weatherDescription.textContent = description;

    card.appendChild(cityName);
    card.appendChild(cityTemperature);
    card.appendChild(weatherEmoji);
    card.appendChild(weatherDescription);
    
    const knowMore = document.createElement('h3');
    knowMore.textContent = 'Additional Info';

    const info = document.createElement('div');
    info.classList.add('info');

    const displayHumidity = document.createElement('p');
    displayHumidity.classList.add('humidity');
    displayHumidity.textContent = `Humidity: ${humidity}%`;

    const displayWindSpeed = document.createElement('p');
    displayWindSpeed.classList.add('wind-speed');
    displayWindSpeed.textContent = `Wind: ${speed} m/s`;

    const displayPressure = document.createElement('p');
    displayPressure.classList.add('pressure');
    displayPressure.textContent = `Pressure: ${pressure} hPa`;

    const displaySunrise = document.createElement('p');
    displaySunrise.classList.add('sunrise');
    displaySunrise.textContent = `Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString()}`;

    const displaySunset = document.createElement('p');
    displaySunset.classList.add('sunset');
    displaySunset.textContent = `Sunset: ${new Date(sunset * 1000).toLocaleTimeString()}`;

    info.appendChild(displayHumidity);
    info.appendChild(displayWindSpeed);
    info.appendChild(displayPressure);
    info.appendChild(displaySunrise);
    info.appendChild(displaySunset);

    card2.appendChild(knowMore);
    card2.appendChild(info);

    card2.style.display = 'block';
}
/*
function displayWeatherInfo(data){
    console.log(data)
    card.textContent = '';
    card2.textContent = '';

    const  {name: city, 
            main: {temp, humidity, pressure}, 
            sys: {country, sunrise, sunset}, 
            wind:{speed}, 
            weather: [{description, icon, id}]} = data;
    
    const cityName = document.createElement('h1');
    cityName.classList.add('city-name');
    cityName.textContent = data['name'];

    const cityTemperature = document.createElement('p');
    cityTemperature.classList.add('temperature')
    cityTemperature.textContent = `${(temp - 273.15).toFixed(1)}°C`;

   const weatherEmoji = document.createElement('p');
    const image = document.createElement('img');
    image.src = getWeatherEmoji(id);
    weatherEmoji.classList.add('weather');
    weatherEmoji.appendChild(image);

    const weatherDescription = document.createElement('p');
    weatherDescription.classList.add('description');
    weatherDescription.textContent = description;

    card.appendChild(cityName);
    card.appendChild(cityTemperature);
    card.appendChild(weatherEmoji)
    card.appendChild(weatherDescription)
    
    const knowMore = document.createElement('h3');
    knowMore.textContent = 'Additional Info';

    const info = document.createElement('div');
    info.classList.add('info');

    const displayHumidity = document.createElement('p');
    displayHumidity.classList.add('humidity')
    displayHumidity.textContent = `Humidity:  ${humidity}`;

    const displayWindSpeed = document.createElement('p');
    displayWindSpeed.classList.add('wind-speed')
    displayWindSpeed.textContent = `Wind:  ${speed}`;


    const displayPressure = document.createElement('p');
    displayPressure.classList.add('pressure')
    displayPressure.textContent = `Pressure:  ${pressure}`;

    const displaySunrise = document.querySelector('.sunrise');
    displaySunrise.classList.add('sunrise')
    displaySunrise.textContent = `Sunrise:  ${sunrise}`;

    const displaySunset = document.querySelector('.sunset');
    displaySunset.classList.add('sunset')
    displaySunset.textContent = `Sunset:  ${sunset}`;

    info.appendChild(displayHumidity)
    info.appendChild(displayWindSpeed)
    info.appendChild(displayPressure)
    info.appendChild(displaySunrise)
    info.appendChild(displaySunset)

    card2.appendChild(knowMore)
    card2.appendChild(info)

    card2.style.display = 'block'
    
}*/

function getWeatherEmoji(weatherId){
    console.log(weatherId)
    switch(true){
        case (weatherId > 200 && weatherId < 300):{
            //thunderstorm
            return '11d@2x.png'
        }
        case (weatherId > 300 && weatherId < 500):{
            //Drizzle
            return '09d@2x.png'
        }
        case (weatherId > 500 && weatherId < 600):{
            if(weatherId <= 504){
                return '10d@2x.png'
            }else if(weatherId == 511){
                return '13d@2x.png'
            }else{
                return '9d@2x.png'
            }
            //rain
        }
        case (weatherId > 600 && weatherId < 700):{
            return '13d@2x.png'
            //snow
        }
        case (weatherId > 700 && weatherId < 800):{
            //clear
            return '50d@2x.png'
        }
        case (weatherId === 800):{
            //clear
            return '01d@2x.png'
        }
        case (weatherId > 800):{
            //clouds
            if(weatherId === 801){
                return '02d@2x.png'
            }else if(weatherId == 802){
                return '03d@2x.png'
            }else{
                return '04d@2x.png'
            }
        }
        
    }
}

function displayError(message){
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('error-display');

    card.textContent = '';
    card.append(errorDisplay);


}



