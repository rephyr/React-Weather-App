import React, { useState } from 'react';

const GraphElement = ({ point, data, index, points, setTooltip })  => {
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
                {Math.round(data.wind.speed)} m/s               
            </text>
            <image x={adjustedX - 15} y={textY+55} width="30" height="30" href={
                `http://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
        </g>
    );
};

export default GraphElement;