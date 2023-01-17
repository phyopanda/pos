import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { pdf } from '../../utilities/export.utility'
import { t, zawgyi } from '../../utilities/translation.utility'
import moment from "moment";
import { itemExportToExcel } from '../../utilities/exports/itemExport.utility'

const CategoryTableHeaderComponent = ({ dataSoucre }) => {
    const state = useSelector(state => state)
    const {lang} = state;

    const [data, setData] = useState([]);
    const [ exportExcel , setExportExcel ] = useState([]);


    const columns = [ t('name') , t('description'), t('total_item')];

    const exportCredit = () => {
        const excelData = exportExcel.map(val => ({
            name : val.code, 
            description : val.description
        }));
        itemExportToExcel("Category List", excelData)
    }

    useEffect(() => {
        if (dataSoucre) {
            const getValue = dataSoucre.map((val) => {
                return [
                    val.name , val.description
                ]
            })
            setData(getValue)
        }
        setExportExcel(dataSoucre)
        
    }, [dataSoucre])
    return (
        <>
            <div className='mb-1'>
                {data.length > 0 && (
                    <div className='d-md-flex flex-md-row'>
                        <Button
                            className={`${zawgyi(lang)}`}
                            onClick={() => pdf(columns, data, `category_${moment().format('D_M_Y')}`)}
                        >
                            {t('btn-export-pdf')}
                        </Button>

                        <Button
                            className={`ms-1 ${zawgyi(lang)}`}
                            onClick={() => exportCredit()}
                        >
                            {t('btn-export-excel')}
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
}

export default CategoryTableHeaderComponent