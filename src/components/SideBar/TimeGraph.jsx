import React from 'react';

function TimeGraph({ sunrise, sunset, nextDaySunrise, timeInLocation }) {
  console.log(sunrise, sunset, nextDaySunrise, timeInLocation);
  const svgWidth = 250;
  const svgHeight = 150;
  const dayColor = 'skyblue';
  const nightColor = 'darkblue';

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

    // Was a bug with midnight but this fixed it dont know why
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
    <svg width={svgWidth} height={svgHeight} style={{ border: '1px solid black', background: isDaytime ? dayColor : nightColor }}>
      <path d={pathData} stroke="black" fill="none" />
      <line x1="0" y1={zeroLineY} x2={svgWidth} y2={zeroLineY} stroke="gray" strokeWidth="2" />
      <circle cx={fixedSunsetPositionX} cy={svgHeight / 2} r="5" fill="orange" /> 
      <circle cx={fixedNextDaySunrisePositionX} cy={svgHeight / 2} r="5" fill="orange" /> 
      <circle cx={currentTimePositionX} cy={currentTimePositionY} r="5" fill="red" />
    </svg>
  );
}

export default TimeGraph;