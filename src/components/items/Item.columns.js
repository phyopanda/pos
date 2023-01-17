import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { changeNumberFormat } from "../../utilities/number.utility";
import { t, zawgyi } from "../../utilities/translation.utility";
import numeral from 'numeral';
import { SortByAlphabet, SortByNumber } from "../../utilities/tableSort.utility";

const OverlayToolTip = (row, filedName) => {
    return(
        <OverlayTrigger placement="top" overlay={<Tooltip> {row[filedName]} </Tooltip>}>
            <span> {row[filedName]} </span>
        </OverlayTrigger>
    )
}

export const ItemColumns = () => {
    const state = useSelector(state => state);
    const { numberFormat, char, lang } = state;

    const num = (value) => {
        return changeNumberFormat(value, numberFormat, char);
    }

    const columns = [
        {   
            name: <span> # </span>,
            selector: (row, index) => index + 1,
            width: '70px'
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {t('materail-code')} </span>,
            selector: row => OverlayToolTip(row, 'code'),
            sortable: true,
            sortFunction: (rowA, rowB) => SortByAlphabet(rowA, rowB, 'code')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {t('name')} </span>,
            selector: row => OverlayToolTip(row, 'eng_name'),
            sortable: true,
            sortFunction: (rowA, rowB) => SortByAlphabet(rowA, rowB, 'eng_name')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {t('model')} </span>,
            selector: row => OverlayToolTip(row, 'model'),
            sortable: true,
            sortFunction: (rowA, rowB) => SortByAlphabet(rowA, rowB, 'model')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {t('location')} </span>,
            selector: row => OverlayToolTip(row, 'location'),
            sortable: true,
            sortFunction: (rowA, rowB) => SortByAlphabet(rowA, rowB, 'location')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {t('quantity')} </span>,
            selector: row => row.qty,
            sortable: true,
            sortFunction: (rowA, rowB) => SortByNumber(rowA, rowB, 'qty')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {`${t('percentage')} (%)`} </span>,
            selector: row =>  numeral(row.percentage).format('0,0'),
            sortable: true,
            sortFunction: (rowA, rowB) => SortByNumber(rowA, rowB, 'percentage')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {`${t('price')} (${t('mmk')})`} </span>,
            selector: row => num(row.price.toString()),
            sortable: true,
            sortFunction: (rowA, rowB) => SortByNumber(rowA, rowB, 'price')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {`${t('profit')} (${t('mmk')})`} </span>,
            selector: row =>  {
                return(
                    <span className={`${row.profit === 0 || row.profit < 0 ? 'red' : 'green'}`}> {numeral(row.profit).format('0,0')} </span>
                )
            },
            sortable: true,
            sortFunction: (rowA, rowB) => SortByNumber(rowA, rowB, 'profit')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {`${t('sale-price')} (${t('mmk')})`} </span>,
            selector: row =>  numeral(row.sell_price).format('0,0'),
            sortFunction: (rowA, rowB) => SortByNumber(rowA, rowB, 'sell_price')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {`${t('total-purchase')} (${t('mmk')})`} </span>,
            selector: row => numeral(row.total_purchase).format('0,0'),
            sortable: true,
            sortFunction: (rowA, rowB) => SortByNumber(rowA, rowB, 'total_purchase')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {`${t('total-sale-price')} (${t('mmk')})`} </span>,
            selector: row => numeral(row.total_sell_price).format('0,0'),
            sortable: true,
            sortFunction: (rowA, rowB) => SortByNumber(rowA, rowB, 'total_sell_price')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {`${t('total-profit')} (${t('mmk')})`} </span>,
            selector: row =>  {
                return(
                    <span className={`${row.total_profit === 0 || row.total_profit < 0 ? 'red' : 'green'}`}> {numeral(row.total_profit).format('0,0')} </span>
                )
            },
            sortable: true,
            sortFunction: (rowA, rowB) => SortByNumber(rowA, rowB, 'total_profit')
        },
    ];

    return columns;
}
