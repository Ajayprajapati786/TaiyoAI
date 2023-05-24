import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Charts = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [casesData, setCasesData] = useState<any>(null);
  const [dailyCases, setDailyCases] = useState<number[]>([]);
  const [dailyDate, setDailyDate] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
        );
        setCasesData(response.data.cases);

        const casesArray: number[] = Object.values(response.data.cases);
        const datesArray: string[] = Object.keys(response.data.cases);

        setDailyCases(casesArray);
        setDailyDate(datesArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dailyCases.length && dailyDate.length && chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous Chart instance
      }

      const ctx: any = chartRef.current.getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dailyDate,
          datasets: [
            {
              label: 'Daily Cases',
              data: dailyCases,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: 'Daily Cases',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance); // Save the new Chart instance
    }
  }, [dailyCases, dailyDate]);

  return (
    <div>
      <h1>COVID-19 Cases Fluctuations</h1>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Charts;
