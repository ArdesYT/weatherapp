
async function fetchData() {
    try {
        const city = document.getElementById("varos").value.toLowerCase();
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1539f3e0500b42c9a4475e8ae4666fcc`);

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description; // Accessing the first element of the weather array
        const logo = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // Constructing the icon URL

        const card = document.getElementsByClassName("card-container")[0]; // Access the first card
        const weather = document.getElementById("weather");
        const cityName = document.getElementById("city");
        const temperaturePlace = document.getElementById("degree");
        const icon = document.getElementById("icon");


        let temp = Math.floor(temperature - 273.15)

        // Update UI with fetched data
        weather.innerText = weatherDescription;
        cityName.innerText = city.toUpperCase();
        cityName.style.marginTop = '14vh'
        temperaturePlace.innerHTML = `${temp} &deg;C`;
        temperaturePlace.style.marginTop = '5vh'
        icon.src = logo;
        icon.style.width = "120px"

        // Show the card
        if (card) {
            card.style.display = 'block';
        }

    } catch (err) {
        console.error(err); // Log the error to the console

        // Display an error message to the user
        const errorMessage = document.getElementById("error-message"); // Assume you have an element to show errors
        if (errorMessage) {
            errorMessage.innerText = "Failed to fetch weather data. Please try again.";
            errorMessage.style.display = 'block'; // Show the error message
        }
    }
}