import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { BsArrowUpRightSquare, BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setOpenDelModal } from "../../redux/actions/openDelModal.action";
import { changeNumberFormat } from "../../utilities/number.utility";
import { zawgyi, t } from "../../utilities/translation.utility";

const numeral = require('numeral');

export const sellItemColumns = (props) => {

    const { lang, numberFormat, char } = props.reducer;
    const { url } = props.match;

    const history = useHistory();
    const dispatch = useDispatch();

    const [type, setType] = useState('');

    const num = (value) => {
        return changeNumberFormat(value, numberFormat, char);
    }

    useEffect(() => {
        const getUrlType = url.split('/')[1];
        setType(getUrlType);
    }, []);

    const columns = [
        {   
            name: <span className='datatable-header'> # </span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('input-item-code')} </span>,
            selector: row => row.code,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('input-item-eng-name')} </span>,
            selector: row => row.eng_name,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('input-item-mm-name')} </span>,
            selector: row => row.mm_name,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('input-item-model')} </span>,
            selector: row => row.model,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('input-item-qty')} </span>,
            selector: row => numeral(row.qty).format('0,0'),
            sortable: true,
            width: "200px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('input-item-price')} (MMK) </span>,
            selector: row => num(row.price),
            sortable: true,
            width: "200px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('table-col-sell-price')} (MMK)</span>,
            selector: row => numeral(row.price * row.qty).format('0,0'),
            sortable: true,
            width: "200px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('table-col-sell-percentage')} </span>,
            selector: row => row.percentage,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('table-col-sell-fix-amount')} (MMK) </span>,
            selector: row => numeral(Number(row.fix_amount)).format('0,0'),
            sortable: true,
            width: "200px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('input-item-location')} </span>,
            selector: row => row.location,
            sortable: true,
            width: "200px"
        }
    ];

    if(type === 'category') {
        delete columns[1];
    }
    return columns;
}
