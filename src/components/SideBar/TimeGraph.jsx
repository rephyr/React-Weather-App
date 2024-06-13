import React from 'react';
import './TimeGraph.css';
import sunImage from '../../assets/sun.png';

function TimeGraph({ sunrise, sunset, nextDaySunrise, timeInLocation }) {
  const svgWidth = 250;
  const svgHeight = 250;

  // Convert UNIX timestamp to readable time
  const convertToReadableTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

  const sunriseTime = convertToReadableTime(sunrise);
  const sunsetTime = convertToReadableTime(sunset);
  const nextDaySunriseTime = convertToReadableTime(nextDaySunrise);

  // Determine if it's daytime or nighttime
  const isDaytime = timeInLocation >= sunrise && timeInLocation <= sunset;
  const isNighttime = timeInLocation > sunset || timeInLocation < sunrise;

  // Too hard for me calculate just hardcode the positions
  const fixedSunsetPositionX = svgWidth * 0.25; 
  const fixedNextDaySunrisePositionX = svgWidth * 0.75;

  // Sine wave parameters
  const amplitude = svgHeight / 4;
  const phaseShift = Math.PI / 2;
  const frequencyAdjusted = 2 * Math.PI / svgWidth;

  // Adjust amplitude and vertical shift
  const amplitudeAdjusted = isDaytime ? -amplitude : amplitude;
  const verticalShiftAdjusted = svgHeight / 2;

  // Generate path data for the adjusted sine wave
  let pathData = "M";
  for (let x = 0; x <= svgWidth; x++) {
    const y = amplitudeAdjusted * Math.sin(frequencyAdjusted * x - phaseShift) + verticalShiftAdjusted;
    pathData += ` ${x},${y}`;
  }

  // Calculate the X position for the current time based on whether it's day or night
  let currentTimePositionX;
  if (isNighttime) {
    let timeRange = nextDaySunrise - sunset + 24 * 3600; 
    let timeProgress;

    if (timeInLocation >= sunset) {
      // Time from sunset to timeInLocation
      timeProgress = (timeInLocation - sunset) / timeRange;
    } else {
      // Time from sunset through midnight to timeInLocation
      timeProgress = (timeInLocation + (24 * 3600 - sunset)) / timeRange;
    }
    currentTimePositionX = fixedSunsetPositionX + timeProgress * (fixedNextDaySunrisePositionX - fixedSunsetPositionX);
  } else {
    let timeRange = sunset - sunrise;
    let timeProgress = (timeInLocation - sunrise) / timeRange;
    currentTimePositionX = fixedSunsetPositionX + timeProgress * (fixedNextDaySunrisePositionX - fixedSunsetPositionX);
  }

  // Calculate Y position for the current time using the adjusted sine wave equation
  const currentTimePositionY = amplitudeAdjusted * Math.sin(frequencyAdjusted * currentTimePositionX - phaseShift) + verticalShiftAdjusted;
  const zeroLineY = svgHeight / 2;

  return (
    <svg className="timeGraph" width={svgWidth} height={svgHeight}>
      <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="rgba(128, 128, 128, 0.4)" rx="20" ry="20" />      
      <circle cx={fixedSunsetPositionX} cy={svgHeight / 2} r="3" fill="white" stroke="white" strokeWidth="2" />
      <circle cx={fixedNextDaySunrisePositionX} cy={svgHeight / 2} r="3" fill="white" stroke="white" strokeWidth="2" />
      <path d={pathData} stroke="white" fill="none" />
      <line x1="0" y1={zeroLineY} x2={svgWidth} y2={zeroLineY} stroke="white" strokeWidth="2" />
      <image xlinkHref={sunImage} x={currentTimePositionX - 10} y={currentTimePositionY - 10} height="20" width="20" />
      <line x1={fixedSunsetPositionX} y1={svgHeight / 2} x2={fixedSunsetPositionX} y2={svgHeight / 4} stroke="white" strokeWidth="1" strokeDasharray="2,2" />
      <line x1={fixedNextDaySunrisePositionX} y1={svgHeight / 2} x2={fixedNextDaySunrisePositionX} y2={svgHeight / 4} stroke="white" strokeWidth="1" strokeDasharray="2,2" />
      {isDaytime ? (
        <>
          <text x={fixedSunsetPositionX} y={svgHeight / 8} fill="white" fontSize="12" textAnchor="middle">Sunrise</text>
          <text x={fixedSunsetPositionX} y={svgHeight / 4.5} fill="white" fontSize="12" textAnchor="middle">{sunriseTime}</text>
          <text x={fixedNextDaySunrisePositionX} y={svgHeight / 8} fill="white" fontSize="12" textAnchor="middle">Sunset</text>
          <text x={fixedNextDaySunrisePositionX} y={svgHeight / 4.5} fill="white" fontSize="12" textAnchor="middle">{sunsetTime}</text>
        </>
      ) : (
        <>
          <text x={fixedSunsetPositionX} y={svgHeight / 8} fill="white" fontSize="12" textAnchor="middle">Sunset</text>
          <text x={fixedSunsetPositionX} y={svgHeight / 4.5} fill="white" fontSize="12" textAnchor="middle">{sunsetTime}</text>
          <text x={fixedNextDaySunrisePositionX} y={svgHeight / 8} fill="white" fontSize="12" textAnchor="middle">Sunrise</text>
          <text x={fixedNextDaySunrisePositionX} y={svgHeight / 4.5} fill="white" fontSize="12" textAnchor="middle">{nextDaySunriseTime}</text>
        </>
      )}
    </svg>
  );
}

export default TimeGraph;