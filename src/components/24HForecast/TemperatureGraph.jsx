import React, { useState, useRef } from 'react';
import { line, curveCardinal } from 'd3';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import SvgIcon from '@mui/material/SvgIcon';
import GraphElement from './GraphElement';

function TemperatureGraph({ forecastData}) {
    const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, text: "" });
    const svgRef = useRef(null);

    if (!forecastData) {
        return <div>Loading...</div>;
    }

    // Calculate the min and max temperature for scaling
    const minTemp = Math.min(...forecastData.map(data => data.main.temp));
    const maxTemp = Math.max(...forecastData.map(data => data.main.temp));

    const filteredForecastData = forecastData.filter((_, index) => index % 2 === 0);
    
    // Create the points for the line with a relative x coordinate
    const points = filteredForecastData.map((data, index) => {
        const x = index / (filteredForecastData.length - 1);
        const y = 210 - ((data.main.temp - minTemp) / (maxTemp - minTemp)) * 100 + 50; 
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
    // for a smooth curve 
    const lineGenerator = line().curve(curveCardinal);
    const pathData = lineGenerator(points);
    const handleMouseMove = (event) => {
        const svgRect = svgRef.current.getBoundingClientRect();
        const x = event.clientX - svgRect.left;
        const closestPointIndex = Math.round((x - minX) / (maxX - minX) * (forecastData.length - 1));
        
        if (closestPointIndex >= 0 && closestPointIndex < forecastData.length) {
            const closestData = forecastData[closestPointIndex];
            // Splitting the titleText into an array of lines
            const titleTextLines = [
                `Time: ${new Date(closestData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`,
                `Temp: ${Math.round(closestData.main.temp)}°C`,
                `Weather: ${closestData.weather[0].description}`
            ];
            setTooltip({ show: true, x: event.clientX, y: event.clientY, text: titleTextLines });
        } else {
            setTooltip({ show: false, x: 0, y: 0, text: "" });
        }
    };
    
    return (
        <div onMouseMove={handleMouseMove} onMouseLeave={() => setTooltip({ show: false, x: 0, y: 0, text: "" })}>
            <svg className="temperature-graph" width={maxX - minX} height={maxY - minY} 
            viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} ref={svgRef}>
                <rect x={minX} y={minY} width={maxX - minX} height={maxY - minY} rx="20" ry="20" fill="rgba(128, 128, 128, 0.4)" />
                <g transform={`translate(${minX + 15}, ${minY + 20})`}>
                    <SvgIcon component={WatchLaterIcon} style={{ fill: "white" }} x={0} y={-8} viewBox="0 0 24 24" width="20" height="15" />
                    <text x={22} y={5} fill="white">24 hour forecast</text>                
                </g>
                <path d={pathData} fill="none" stroke="white" />
                {filteredForecastData.map((data, index) => (
                    <GraphElement
                        key={index}
                        point={points[index]}
                        data={data}
                        index={index}
                        points={points} 
                        setTooltip={setTooltip} 
                    />
                ))}
            </svg>
            {tooltip.show && 
                <div style={{ 
                    position: 'fixed',
                    top: `${tooltip.y-50}px`, 
                    left: `${tooltip.x}px`, 
                    backgroundColor: 'black', 
                    color: 'white', 
                    border: '1px solid white', 
                    padding: '5px', 
                    fontSize: '12px',
                    fontFamily: 'Arial',
                    borderRadius: '4px', 
                    whiteSpace: 'pre-line' 
                }}>
                    {tooltip.text.join('\n')} 
                </div>
            }
        </div>
    );
}

export default TemperatureGraph;