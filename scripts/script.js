import axios from 'axios';
import _ from 'lodash';
import Chart from 'chart.js/auto';

// Fetch weather data from OpenWeather API
const fetchData = async () => {
    const apiKey = "8524cd27b877ca4aa89de3342dbbef96";
    const city = "Kyiv";
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        return response.data.list.map(entry => ({
            temp: entry.main.temp - 273.15, // Converting to Celsius
            time: entry.dt_txt // Time of the data point
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

// Process and visualize the fetched data
// Process and visualize the fetched data
const visualizeData = async () => {
    const rawData = await fetchData();

    // If rawData is empty, skip visualization
    if (_.isEmpty(rawData)) {
        return;
    }

    // Creating a Line Chart for temperature
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: rawData.map(entry => entry.time), // Actual time labels
            datasets: [{
                label: 'Temperature (°C)',
                data: rawData.map(entry => entry.temp), // Actual temperature values
                borderColor: ['#FFA07A'],
                fill: false
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Temperature Forecast for Kyiv'
                }
            }
        }
    });
};

// Execute the function when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    visualizeData();
});
