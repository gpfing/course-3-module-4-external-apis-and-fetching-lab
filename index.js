const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Grab references to DOM elements
const alerts = document.querySelector("#alerts-display");
const button = document.querySelector("#fetch-alerts");
const input = document.querySelector("#state-input");
const errors = document.querySelector("#error-message");

// Button click
button.addEventListener("click", function() {
  const state = input.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
});

// Fetch Weather Alerts
function fetchWeatherAlerts(state) {
  // Get rid of previous alerts
  alerts.innerHTML = "";
  errors.textContent = "";
  errors.classList.add("hidden");

  fetch(weatherApi + state)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Display alerts
      displayAlerts(data, state);
      // Clear input after successful fetch
      input.value = "";
    })
    .catch(function(error) {
      errors.textContent = error.message;
      errors.classList.remove("hidden");
      console.log("Error:", error.message);
    });
}

// Display alerts
function displayAlerts(data, state) {
  const count = data.features.length;

  // Summary in expected format for Jest
  const summary = document.createElement("h2");
  summary.textContent = `Weather Alerts: ${count}`;
  alerts.appendChild(summary);

  // List of headlines
  const ul = document.createElement("ul");
  data.features.forEach(function(alert) {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  alerts.appendChild(ul);
}