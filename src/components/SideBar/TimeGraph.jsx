import React from 'react';

function TimeGraph({ sunrise, sunset, nextDaySunrise }) {
  const svgWidth = 250;
  const svgHeight = 150;
  // Ensure time is in seconds; adjust as necessary to match your data
  const currentTime = Date.now() / 1000;
  const totalCycleLength = nextDaySunrise - sunrise;

  // Determine if it's day or night
  const isDaytime = currentTime >= sunrise && currentTime <= sunset;

  // Calculate positions
  const leftPosition = isDaytime ? sunrise : sunset;
  const rightPosition = isDaytime ? sunset : nextDaySunrise;

  // Function to calculate Y position based on time
  const calculateYPosition = (time) => {
    const phaseShift = isDaytime ? 0 : Math.PI;
    const frequency = (2 * Math.PI) / totalCycleLength;
    const x = time - sunrise;
    return svgHeight / 2 + (svgHeight / 4) * Math.sin(frequency * x + phaseShift);
  };

  // Generate points for the path
  const points = [];
  for (let t = leftPosition; t <= rightPosition; t += totalCycleLength / svgWidth) {
    const x = ((t - leftPosition) / (rightPosition - leftPosition)) * svgWidth;
    const y = calculateYPosition(t);
    points.push(`${x},${y}`);
  }
  const pathData = `M ${points.join(' L ')}`;

  // Current position
  const currentPositionX = ((currentTime - leftPosition) / (rightPosition - leftPosition)) * svgWidth;
  const currentPosY = calculateYPosition(currentTime);

  return (
    <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ border: '1px solid black' }}>
      <line x1="0" y1={svgHeight / 2} x2={svgWidth} y2={svgHeight / 2} stroke="grey" strokeWidth="1" />
      <path d={pathData} stroke="black" fill="none" />
      <circle cx={currentPositionX} cy={currentPosY} r={5} fill="blue" />
    </svg>
  );
}

export default TimeGraph;