import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function RainChart({ forecastData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!forecastData) {
      return;
    }
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      // Extracting rain data and labels
      const labels = forecastData.map(item => new Date(item.dt_txt).getHours() + ':00');
      const rainData = forecastData.map(item => item.rain ? item.rain['1h'] : 0);
      
      // Destroy previous chart instance if exists
      if (window.myRainChart instanceof Chart) {
        window.myRainChart.destroy();
      }

      // Creating a new chart instance
      window.myRainChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Rain Amount (mm)',
            data: rainData,
            backgroundColor: 'rgba(0, 123, 255, 0.6)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
            borderRadius: 0 
          }]
        },
        options: {
            responsive: false,
            layout: {
              padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: 'rgba(255, 255, 255, 1)' 
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.5)'
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 1)'
                }
              },
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.5)'
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 1)'
                }
              }
            }
          },
        plugins: [{
            beforeDraw: (chart) => {
              const ctx = chart.ctx;
              const {width, height} = chart;
          
              // Function to draw a rounded rectangle
              // ???????
              function drawRoundedRect(ctx, x, y, width, height, radius) {
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
              }
          
              ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
              const borderRadius = 20; 
              drawRoundedRect(ctx, 0, 0, width, height, borderRadius);
              ctx.fill();
            }
          }]
      });
    }
  }, [forecastData]); 

  if (!forecastData) {
    return <div>Loading...</div>;
  }

  return <canvas ref={chartRef}  width="920" height="250" className="rain-chart" />;
}

export default RainChart;