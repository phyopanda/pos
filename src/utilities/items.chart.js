import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import { BsFillPieChartFill } from "react-icons/bs";
import { t, zawgyi } from './translation.utility';
import { colorGen, generateColor } from './colorgenerator';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ItemsChart = (({ props, type, title, dataSource}) => {
    const { lang } = props.reducer;
    const [ chartData, setChartData ] = useState(null);

    useEffect(() => {
        if(type){
            let dataSet = [];
            let labels =[...new Set(type)];

            labels.map((lbl, index) => {
                const dataCount = type.filter((item => item === lbl)).length;
                dataSet.push(dataCount);
            });

            const data = {
                labels: labels.map((e) => { 
                    if(e===true){
                        return e = 'Active';
                    }
                    else if(e === false){
                        return e = 'Disable';
                    }
                    else return e;
                }),
                datasets: [
                    {
                        label: '# of labels',
                        data: dataSet,
                        backgroundColor: ['rgba(235, 44, 43, 1)','rgba(43, 235, 44, 1)','rgba(43, 44, 235)',...generateColor(labels)],
                        borderWidth: 1,
                    }
                ]
            };
            setChartData(data);
         };
},[type]);

return (
        <Card>
            <Card.Header>
                <Card.Title>
                    <BsFillPieChartFill size={20} />
                    <span className={`${zawgyi(lang)}`}> { title } </span>
                </Card.Title>
            </Card.Header>

            <Card.Body>
                {chartData && (
                    <Doughnut 
                        data={chartData}
                    />
                )}
            </Card.Body>
        </Card>
)
                })
