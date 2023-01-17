import React, { useEffect, useState } from 'react'
import { Chart as ChartJS , registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { t } from 'i18next';

ChartJS.register(...registerables)

export const CategoryChart = ( {categories} ) => {

    const [ data , setData ] = useState([])

    const chartLabels = data.map(value => value.name);

    const chartdata = {
        labels : chartLabels,
        datasets : [
            {
                label: t('total-item'),
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: data.map(value => value.total_item)
              },
        ]
    }

    const optionsShow = {
        responsive: true,
        plugins: {
          title:{
            display:true,
            text:'Category List',
            fontSize:20
        },
        legend:{
            display:true,
            position:'top'
        },
        }
      }

    useEffect(() => {
        if(categories) {
            setData(categories)
        }
    },[categories])
  return (
    <>
     <Bar 
        className='mt-3'
        data={chartdata}
        options={optionsShow}
     />
    </>
  )
}
