const apiKey = 'fc0e3458f6c2a129588f643bf620caa5'; // Replace with your actual API key from OpenWeatherMap
const searchInput = document.getElementById('search');
const weatherDiv = document.getElementById('weather');
const weatherIcon = weatherDiv.querySelector('img');
const temperature = weatherDiv.querySelector('h2');
const weatherDescription = weatherDiv.querySelector('h4');

searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    const city = searchInput.value;
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.cod === 200) {
        const { main, weather } = data;
        const iconCode = weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

        weatherIcon.src = iconUrl;
        temperature.textContent = `${Math.round(main.temp)} °C`;
        weatherDescription.textContent = weather[0].description;
      } else {
        weatherIcon.src = '';
        temperature.textContent = 'City not found';
        weatherDescription.textContent = '';
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      weatherIcon.src = '';
      temperature.textContent = 'Error fetching data';
      weatherDescription.textContent = '';
    });
}
