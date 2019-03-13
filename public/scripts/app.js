const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();

  const location = searchElement.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.address;
        let weatherInfo =
          "Forecast: " +
          data.forecast +
          "<br/>" +
          "Temperature: " +
          data.temperature +
          "<br/>" +
          "Apparent Temperature: " +
          data.apparentTemperature;
        messageTwo.innerHTML = weatherInfo;
      }
    });
  });
});
