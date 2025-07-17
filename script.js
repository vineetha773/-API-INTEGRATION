// Grab form and result box from the DOM
const weatherForm = document.getElementById('weatherForm');
const outputArea = document.getElementById('weatherResult');

// Handle form submission
weatherForm.addEventListener('submit', async function(e) {
  e.preventDefault(); // Stop the page from reloading

  const cityInput = document.getElementById('cityInput').value.trim();
  const apiKey = 'a6eaafc9b958b053436d42250e4e374f'; // should probably hide this later
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  try {
    // Make the request
    const response = await fetch(endpoint);
    if (!response.ok) {
      // Just throw an error if we didn't get 200
      throw new Error('City not found');
    }

    // Parse JSON (still hate how I always forget to await this part)
    const weatherData = await response.json();

    // Build the HTML output (could use template engine if I were fancy)
    outputArea.innerHTML = `
      <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
      <p><strong>Temperature:</strong> ${weatherData.main.temp} °C</p>
      <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
    `;

    // Just checking what else is in the response
    // console.log(weatherData);

  } catch (err) {
    // Might wanna show more friendly message later
    outputArea.innerHTML = `<p style="color: red;">${err.message}</p>`;
  }
});
