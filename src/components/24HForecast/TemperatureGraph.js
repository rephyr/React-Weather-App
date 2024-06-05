import React from 'react';
import { line, curveCardinal } from 'd3';
import './TemperatureGraph.css';

function TemperatureGraph({ forecastData }) {
    if (!forecastData) {
        return <div>Loading...</div>;
    }

    // Calculate the min and max temperature for scaling
    const minTemp = Math.min(...forecastData.map(data => data.main.temp));
    const maxTemp = Math.max(...forecastData.map(data => data.main.temp));

    // Select the first data point and every third data point after that
    const filteredForecastData = forecastData.filter((_, index) => index % 2 === 0);

    // Create the points for the polyline with a relative x coordinate
    const points = filteredForecastData.map((data, index) => {
        const x = index / (filteredForecastData.length - 1);
        const y = 200 - ((data.main.temp - minTemp) / (maxTemp - minTemp)) * 100 + 50; 
        return [x, y];
    });;

    // Calculate the min and max x and y coordinates for the rectangle
    const minX = 50;
    const maxX = 950;
    const minY = 90; 
    const maxY = 260;

    // Adjust the x coordinate of the points
    points.forEach(point => {
        point[0] = minX + point[0] * (maxX - minX);
    });


    // Create the line generator with the cardinal spline interpolation
    const lineGenerator = line().curve(curveCardinal);
    const pathData = lineGenerator(points);

    const GraphElement = ({ point, data, index }) => {
        if (index === points.length - 1) return null;
        const textAnchor = index === 0 ? "start" : index === points.length - 1 ? "end" : "middle";
        const textY = point[1] < 20 ? point[1] + 20 : point[1] - 10;

        return (
            <g key={index}>
                <circle cx={point[0]} cy={point[1]} r={2} fill="black" />
                <text x={point[0]} y={textY} fontSize="10" textAnchor={textAnchor}>
                    {data.main.temp}°
                </text>
                <text x={point[0]} y={textY + 30} fontSize="10" textAnchor="middle">
                    {new Date(data.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </text>
                <text x={point[0]} y={textY + 50} fontSize="10" textAnchor="middle">
                    {data.wind.speed} m/s
                </text>
                <image x={point[0] - 10} y={textY + 60} width="20" height="20" href={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
            </g>
        );
    };
        
    
    return (
        <svg className="temperature-graph" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <rect x={minX} y={minY - 20} width={maxX - minX} height={maxY - minY + 100} rx="20" ry="20" fill="none" stroke="black" />
            <path d={pathData} fill="none" stroke="black" />
            {points.map((point, index) => (
                <GraphElement key={index} point={point} data={filteredForecastData[index]} index={index} />
            ))}
        </svg>
    );
}

export default TemperatureGraph;