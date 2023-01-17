import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const WeekChart = () => {

    const dataSource = {
        labels: ['Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday' ],
        datasets: [
          {
            label: 'Monday',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65]
          },
          {
            label: 'Tuesday',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [0 ,45]
          },
          {
            label: 'Wednesday',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [0, 0 ,45]
          },
          {
            label: 'Thursday',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [0, 0, 0 ,45]
          },
          {
            label: 'Friday',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [0,0 ,0 , 0 ,45]
          },
          {
            label: 'Saturday',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [0, 0, 0 ,0 ,0 ,45]
          },
          {
            label: 'Sunday',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [0, 0 ,0 ,0 ,0 ,0 ,45]
          },
        ]
    }
    const optionsShow = {
        responsive: true,
        plugins: {
          title:{
            display:true,
            text:'Week InCome',
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

export default WeekChart