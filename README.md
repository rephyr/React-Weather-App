# Weather App

![App Picture](src/assets/AppPicture.JPG)

This is a weather forecasting application built with React. It fetches weather data from an API and displays a 24-hour forecast.

## Project Structure

The project is structured as follows:

- `src/` - Contains the source code for the application.
- `api/` - Contains the API calls.
- `components/` - Contains the React components.
- `hooks/` - Contains the custom React hooks.

## Libraries Used

This project uses the following libraries:

- React (`react`, `react-dom`) for building the user interface.
- @emotion/react and @emotion/styled for styling components.
- @mui/icons-material and @mui/material for Material UI components.
- chart.js and d3 for data visualization.

## API Services

The application fetches weather data using the OpenWeatherMap API. It makes use of the following endpoints:

- Current weather data: `http://api.openweathermap.org/data/2.5/weather`
- 7-day weather forecast: `https://api.openweathermap.org/data/2.5/forecast/daily`
- 24-hour forecast: `https://pro.openweathermap.org/data/2.5/forecast/hourly`

## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env.local` file in the root directory and add your API keys.

## Running the Application

To start the application, run `npm start`.