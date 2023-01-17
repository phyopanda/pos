import React, { useEffect } from "react";
import { zawgyi, t } from "../../utilities/translation.utility";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeNumberFormat } from "../../utilities/number.utility";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { addToCartAction } from "../../redux/actions/sale.action";

const numeral = require('numeral');

export const saleTableColumns = (props) => {
    const { lang } = props.reducer;
    const dispatch = useDispatch();
    const history = useHistory();

    const [ itemSaleAmount, setItemSaleAmount ] = useState(0);
    const [ loading, setLoading ] = useState(false);
    const [ cartItemModel, setCartItemModel ] = useState('');
    const [ cartItemPrice, setCartItemPrice ] = useState(0);
    const [ cartItemsList, setCartItemsList ] = useState([]);


    const num = (value) => {
        return changeNumberFormat(value, numberFormat, char,);
    };
    

    return [
        {
            name: <span className="datatable-header">#</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('item-code')}</span>,
            selector: row => row.code,
            sortable: true
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('item-eng-name')}</span>,
            selector: row => row.eng_name,
            sortable: true
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('item-mm-name')}</span>,
            selector: row => row.mm_name,
            sortable: true
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('item-model')}</span>,
            selector: row=> row.model,
            sortable: true
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('item-qty')}</span>,
            selector: row=> numeral(row.qty).format('0,0'),
            sortable: true
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('item-price')}</span>,
            selector: row => numeral(row.price).format('0,0'),
            sortable: true
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-sell-fix-amount')} (MMK) </span>,
            selector: row => numeral(Number(row.fix_amount)).format('0,0'),
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-location')} </span>,
            selector: row => row.location,
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>Number of amount</span>,
            selector: (row) => {
                return (
                    <>
                        <FormControl
                            type='number'
                            min={0}
                            max={row.qty}
                            disabled={loading}
                            onChange={(e) => {
                                setItemSaleAmount(e.target.value);
                                setCartItemModel(row.model);
                                setCartItemPrice(row.price);
                            }}
                            onBlur={(e) => {
                                dispatch(addToCartAction(cartItemModel, cartItemPrice, itemSaleAmount))
                            }}
                        />
                    </>
                )
            }
        }
    ]
}