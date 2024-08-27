import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react'

function ChartCom() {
  const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: ['Abril', 'Mayo', 'Junio', 'Julio'],
            datasets: [
                {
                    label: 'Sales',
                    data: [540, 325, 702, 620],
                    backgroundColor: [
                        // 'rgba(255, 159, 64, 0.2)',
                        // 'rgba(75, 192, 192, 0.2)',
                        // 'rgba(54, 162, 235, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)'
                        'rgb(54, 162, 235)',
                        'rgb(54, 162, 235)',
                        'rgb(54, 162, 235)',

                      ],
                      borderColor: [
                        'rgb(54, 162, 235)',
                        'rgb(54, 162, 235)',
                        'rgb(54, 162, 235)',
                        'rgb(54, 162, 235)',
                        // 'blue',
                        // 'blue',
                        // 'blue',
                        // 'blue'
                      ],
                      borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div style={{width: "50%", margin:"auto"}}>
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}

export default ChartCom