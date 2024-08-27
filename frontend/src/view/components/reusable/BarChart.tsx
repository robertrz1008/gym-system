import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

interface Props{
    title: string
    items: {
        labels: string[],
        data: number[]
        colors: string[]
    }
}

export default function BarChart({title, items}: Props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: items.labels,
            datasets: [
                {
                    label: title,
                    data: items.data,
                    backgroundColor: items.colors,
                      borderColor: items.colors,
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
        <div className='barChart-con'>
            <Chart type="bar" data={chartData} options={chartOptions} width='100%'/>
        </div>
    )
}
        