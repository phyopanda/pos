import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const MonthsChart = () => {

    
const dataSource = {
    labels: ['January', 'February', 'March',
             'April', 'May', 'June', 'July', 'August','September', 'October', 'November' , 'December' ],
    datasets: [
      {
        label: 'January',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65]
      },
      {
        label: 'February',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0 ,45]
      },
      {
        label: 'March',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0, 0 ,45]
      },
      {
        label: 'April',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0, 0 ,0 ,45]
      },
      {
        label: 'May',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0,0 ,0 ,0 ,45]
      },
      {
        label: 'June',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0,0,0,0,0 ,45]
      },
      {
        label: 'July',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0 ,0,0,0,0,0,45]
      },
      {
        label: 'August',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0,0,0,0,0,0,0 ,45]
      },
      {
        label: 'September',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0,0,0,0,0,0,0,0  ,45]
      },
      {
        label: 'October',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0,0, 0,0,0,0,0,0,0  ,45]
      },
      {
        label: 'November',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0,0,0, 0,0,0,0,0,0,0  ,45]
      },
      {
        label: 'December',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0 ,0,0,0, 0,0,0,0,0,0,0 ,45]
      },
    ]
  };

  const optionsShow = {
    responsive: true,
    plugins: {
      title:{
        display:true,
        text:'Monthly InCome',
        fontSize:20
    },
    legend:{
        display:true,
        position:'top'
    },
    }
  }

    return (
        <>
            <Bar
                className='mt-3'
                data={dataSource}
                options={optionsShow}
            />
        </>
    )
}

export default MonthsChart