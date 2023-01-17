import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { pdf } from '../../utilities/export.utility';
import moment from "moment";
import { t, zawgyi } from '../../utilities/translation.utility';
import { itemExportToExcel } from '../../utilities/exports/itemExport.utility';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDelModal } from '../../redux/actions/openDelModal.action';

export const ItemTableHeaderComponent = ({ dataSource }) => {

    const state = useSelector(state => state);
    const { lang } = state;
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [exportExcel, setExportExcel] = useState([]);
    const columns = ['Material Code', 'Name', 'Brand', 'Model', 'Location', 'Purchase Price', 'Percentage', 'Sell Price'];

    const exportCredit = () => {
        const excelData = exportExcel.map(e => ({
            code: e.code,
            eng_name: e.eng_name,
            category_name: e.category.name,
            model: e.model,
            location: e.location,
            price: e.price,
            percentage: e.percentage,
            sell_price: e.sell_price
        }));
        itemExportToExcel("Item List", excelData)
    }

    useEffect(() => {
        if (dataSource) {
            const getValue = dataSource.map((value) => {
                return [
                    value.code, value.eng_name, value.category ? value.category.name : null, value.model,
                    value.location, value.price, value.percentage, value.sell_price
                ];
            });
            setData(getValue);
        }
        setExportExcel(dataSource)
    }, [dataSource]);

    return (
        <div className='mb-3'>
            {/* {data.length > 0 && ( */}
                <div className='d-md-flex flex-md-row'>
                    {/* <Button
                        className={`ms-1 ${zawgyi(lang)}`}
                        onClick={() => dispatch(setOpenDelModal({
                            open: true,
                            title: t('delete-title'),
                            message: t('delete-message'),
                            type: 'items',
                            multiple: true,
                            data : dataSource
                        }))}
                    >
                        {t('delete-all')}
                    </Button> */}
                    <Button
                        className={`ms-1 ${zawgyi(lang)}`}
                        onClick={() => pdf(columns, data, `inventory_${moment().format('D_M_Y')}`)}
                    >
                        Import Excel
                    </Button>
                    <Button
                        className={`ms-1 ${zawgyi(lang)}`}
                        onClick={() => pdf(columns, data, `inventory_${moment().format('D_M_Y')}`)}
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
            {/* )} */}
        </div>
    )
}