import React, { useState, useRef } from 'react';
import { line, curveCardinal } from 'd3';
import './TemperatureGraph.css';

function TemperatureGraph({ forecastData,}) {
    const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, text: "" });
    const svgRef = useRef(null);

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
    const minX = 30; 
    const maxX = 950;
    const minY = 90; 
    const maxY = 340;

    // Adjust the x coordinate of the points
    points.forEach(point => {
        point[0] = minX + 30 + point[0] * (maxX - minX - 20); 
    });


    // Create the line generator with the cardinal spline interpolation
    const lineGenerator = line().curve(curveCardinal);
    const pathData = lineGenerator(points);

    const handleMouseMove = (event) => {
        const svgRect = svgRef.current.getBoundingClientRect();
        const x = event.clientX - svgRect.left;
        const closestPointIndex = Math.round((x - minX) / (maxX - minX) * (forecastData.length - 1));
        
        // Check if closestPointIndex is within the range of the forecastData array
        if (closestPointIndex >= 0 && closestPointIndex < forecastData.length) {
            const closestData = forecastData[closestPointIndex];
            const titleText = `Time: ${new Date(closestData.dt * 1000).toLocaleTimeString
                ([], { hour: '2-digit', minute: '2-digit', hour12: false })}, 
                Temp: ${Math.round(closestData.main.temp)}°`;
            setTooltip({ show: true, x: event.clientX, y: event.clientY, text: titleText });
        } else {
            // Hide the tooltip if closestPointIndex is out of range
            setTooltip({ show: false, x: 0, y: 0, text: "" });
        }
    };

    const GraphElement = ({ point, data, index }) => {
        const [hovered, setHovered] = useState(false);
        if (index === points.length - 1) return null;
        const textAnchor = "middle"; 
        const textY = point[1] < 20 ? point[1] + 20 : point[1] - 10;
        const adjustedX = point[0]; 
        const titleText = `Time: ${new Date(data.dt * 1000).toLocaleTimeString([], 
            { hour: '2-digit', minute: '2-digit', hour12: false })}, Temp: ${Math.round(data.main.temp)}°`;
    
        return (
            <g key={index} onMouseEnter={(e) => { setTooltip({ 
                show: true, x: e.clientX, y: e.clientY, text: titleText }); setHovered(true); }}>
                <circle cx={adjustedX} cy={point[1]} r={hovered ? 4 : 2} fill="white" />
                <text x={adjustedX} y={textY} fontSize="15" fill="white" textAnchor={textAnchor}>
                    {Math.round(data.main.temp)}°
                </text>
                <text x={adjustedX} y={textY + 30} fontSize="13" fill="white" textAnchor="middle">
                    {new Date(data.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </text>
                <text x={adjustedX} y={textY + 50} fontSize="13" fill="white" textAnchor="middle">
                    {data.wind.speed} m/s
                </text>
                <image x={adjustedX - 17} y={textY + 60} width="30" height="30" href={
                    `http://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
            </g>
        );
    };
    
    return (
        <div onMouseMove={handleMouseMove} onMouseLeave={() => setTooltip({ show: false, x: 0, y: 0, text: "" })}>
            <svg className="temperature-graph" width={maxX - minX} height={maxY - minY} 
            viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} ref={svgRef}>
                <rect x={minX} y={minY} width={maxX - minX} height={maxY - minY} rx="20" ry="20" fill="rgba(128, 128, 128, 0.4)" />
                <text x={minX + 10} y={minY + 20} fill="white">24 hour forecast</text>
                <path d={pathData} fill="none" stroke="white" />
                {points.map((point, index) => (
                    <GraphElement point={point} data={filteredForecastData[index]} index={index} />
                ))}
            </svg>
            {tooltip.show && 
                <div style={{ position: 'fixed', top: tooltip.y, left: tooltip.x, 
                backgroundColor: 'white', border: '1px solid black', padding: '10px' }}>

                    {tooltip.text}
                </div>
            }
        </div>
    );
}

export default TemperatureGraph;