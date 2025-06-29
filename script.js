//const apiKey = "7dbc051fd396d150730407f66cf72f20"; // Replace with your actual OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "7dbc051fd396d150730407f66cf72f20"; // 🔑 Replace with your actual OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    document.getElementById("icon").innerHTML =
      `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">`;

    document.getElementById("description").innerText =
      `${description} | ${temperature}°C`;

    document.getElementById("details").innerHTML = `
      🌅 <strong>Sunrise:</strong> ${sunriseTime}<br>
      💧 <strong>Humidity:</strong> ${humidity}%<br>
      🌬️ <strong>Wind Speed:</strong> ${windSpeed} m/s
    `;

  } catch (error) {
    document.getElementById("icon").innerHTML = "";
    document.getElementById("description").innerText = "❌ " + error.message;
    document.getElementById("details").innerText = "";
  }
}

function toggleMode() {
  const isDark = document.body.classList.toggle("dark");
  document.getElementById("modeLabel").innerText = isDark ? "🌙 Night Mode" : "☀️ Light Mode";
}
