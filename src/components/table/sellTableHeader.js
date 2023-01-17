import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { autocomplete } from '../../utilities/table.utility';
import { t, zawgyi } from '../../utilities/translation.utility';
import { useDispatch } from 'react-redux';
import { setSellPriceAction } from '../../redux/actions/sellprice.action';
import numeral from 'numeral';

import '../../assets/css/components/sell-table-header.css';
import { setOpenToastAction } from '../../redux/actions/toast.action';

export const SellTableHeader = ({ props, dataSource, searchColumns, placeholder, filterResult, selectedRows, categories, filterCategory, preCart, remove }) => {
    const { lang } = props.reducer;

    const dispatch = useDispatch();

    const [text, setText] = useState('');
    const [filterType, setFilterType] = useState(searchColumns[0]);
    const [selectedList, setSelectedList] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sellPrice, setSellPrice] = useState('percentage');
    const [percentage, setPercentage] = useState('');
    const [qty, setQty] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, setCart] = useState([]);

    const calculateTotalPrice = () => {
        if(selectedList && props.reducer.sellPrice === 'percentage') {
            const price = (((Number(selectedList.price) * Number(selectedList.percentage)) / 100) + Number(selectedList.price)) * qty;
            setTotalPrice(price);
        }

        if(selectedList && props.reducer.sellPrice === 'fix') {
            const price = (Number(selectedList.price) + Number(selectedList.fix_amount)) * qty;
            setTotalPrice(price);
        }
    }

    const changeSellPrice = (e) => {
        setTotalPrice(0);
        setQty(0);
        setSellPrice(e);
        dispatch(setSellPriceAction(e));
        calculateTotalPrice();
    }

    const autoSearch = (text) => {
        const result = autocomplete(dataSource, text, filterType);
        setText(text);
        filterResult(result);
    }

    const selectedCategoryFilter = (e) => {
        setSelectedCategory(e);
        filterCategory(e);
    }

    const changeQty = () => {
        calculateTotalPrice();
    }

    const changePercentage = (e) => {
        if(e.length > 3 || Number(e) > 100) {
            e = 100;
        }

        const selectedItem = selectedList;
        selectedItem.percentage = e;

        if(props.reducer.sellPrice === 'percentage') {
            const price = (((Number(selectedList.price) * Number(selectedList.percentage)) / 100) + Number(selectedList.price)) * qty;
            setTotalPrice(price);
        }
        
        setSelectedList(selectedItem);
        setPercentage(e);
    }

    const reset = () => {
        setFilterType(searchColumns[0]);
        setText('');
        filterResult(dataSource);
    }

    const addToCart = () => {
        if(Number(qty) === 0) {
            dispatch(setOpenToastAction(t('toast-sell'), t('validation-sell-qty-zero'), 'danger'));
            return;
        }

        const cartItem = {
            name: selectedList.eng_name,
            model: selectedList.model,
            code: selectedList.code,
            qty: Number(qty),
            price: totalPrice / qty,
            total: totalPrice
        }

        const isExist = cart.filter(item => item.code === cartItem.code);

        if(isExist && isExist.length > 0) {
            dispatch(setOpenToastAction(t('toast-sell'), t('validation-sell-item-exit'), 'danger'));
            return;
        }

        let addCart = cart;
        addCart.push(cartItem);

        setCart(addCart);
        preCart(addCart);
    }

    useEffect(() => {
        if(selectedRows) {
            setSelectedList(selectedRows[0]);
            
            if(selectedRows[0]) {
                setPercentage(selectedRows[0].percentage);
                setTotalPrice(0);
                setQty(0);
            }
        }
    },[selectedRows]);

    useEffect(() => {
        if(props.reducer.sellPrice) {
            setSellPrice(props.reducer.sellPrice);
            setTotalPrice(0);
        }
    }, [props.reducer.sellPrice]);

    useEffect(() => {
        if(remove) {
            let updateCart = cart.filter(item => item.code !== remove.code);
            setCart(updateCart);
            preCart(updateCart);
        }
    },[remove])
    return(
        <div className='table-header mb-3'>
            <div className='table-header-left'>
                {selectedList && (
                    <div className='d-md-flex flex-md-column'>
                        <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
                            <small className={`${zawgyi(lang)}`}> {t('input-item-name')} </small>
                            <small> {selectedList.eng_name} / {selectedList.mm_name}  </small>
                        </div>

                        <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
                            <small className={`${zawgyi(lang)}`}> {t('input-item-code')} </small>
                            <small> {selectedList.code} </small>
                        </div>

                        <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
                            <small className={`${zawgyi(lang)}`}> {t('input-item-model')} </small>
                            <small> {selectedList.model} </small>
                        </div>

                        <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
                            <small className={`${zawgyi(lang)}`}> {t('input-item-sell-price')} </small>

                            {props.reducer.sellPrice === 'percentage' && (
                                <span> {numeral(((Number(selectedList.price) * Number(selectedList.percentage)) / 100) + Number(selectedList.price)).format('0,0')} MMK </span>
                            )}

                            {props.reducer.sellPrice === 'fix' && (
                                <span> { numeral(Number(selectedList.price) + Number(selectedList.fix_amount)).format('0,0')} MMK </span>
                            )}
                        </div>

                        <h3 className={`${zawgyi(lang)} mt-3`}> {t('total-price')} - {numeral(totalPrice).format('0,0')} MMK </h3>

                        <InputGroup className='mt-3'>
                            <FormControl 
                                className={`input-small ${zawgyi(lang)}`}
                                type="number"
                                value={qty}
                                placeholder={t('input-item-number')}
                                onChange={(e) => setQty(e.target.value)}
                                onBlur={() => changeQty()}
                            />

                            <FormControl 
                                className={`input-small ${zawgyi(lang)}`}
                                type="number"
                                value={percentage}
                                placeholder={t('input-item-percentage')}
                                onChange={(e) => changePercentage(e.target.value)}
                                maxLength={3}
                                disabled={props.reducer.sellPrice === 'percentage' ? false : true}
                            />

                            <Button 
                                className={`btn-small ${zawgyi(lang)}`}
                                onClick={() => addToCart()}
                            > 
                                {t('btn-cart')} 
                            </Button>
                        </InputGroup>
                    </div>
                )}
            </div>

            <InputGroup className='table-header-right'>
                <FormControl
                    className={`input-small ${zawgyi(lang)}`}
                    as={'select'}
                    value={sellPrice}
                    onChange={(e) => changeSellPrice(e.target.value)}
                >
                    <option value="percentage"> {t('percentage')} </option>
                    <option value="fix"> {t('fix-amount')} </option> 
                </FormControl>

                <FormControl 
                    className={`input-small ${zawgyi(lang)}`}
                    as={'select'}
                    value={selectedCategory}
                    onChange={(e) => selectedCategoryFilter(e.target.value)}
                >
                    <option value="All"> {t('input-select-category-all')} </option>
                    {categories && categories.map((category, index) => {
                        return(
                            <option key={`category_id_${index}`} value={category.id}> {category.name} </option>
                        )
                    })}
                </FormControl>

                <FormControl
                    className={`input-small ${zawgyi(lang)}`}
                    type='text'
                    placeholder={placeholder}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onBlur={e => autoSearch(e.target.value)}
                />

                <FormControl
                    className={`select-input-group ${zawgyi(lang)}`}
                    as={'select'}
                    value={filterType}
                    onChange={(e) => {
                        setFilterType(e.target.value);
                        setText('');
                        filterResult(dataSource)
                    }}
                >
                    {searchColumns.map((filter, index) => {
                        return(
                             <option key={`filter_column_id_${index}`}> {filter} </option>
                        )
                    })}
                </FormControl>
                    
                <Button 
                    className={`btn-small ${zawgyi(lang)}`}
                    onClick={() => reset()}
                > 
                    {t('btn-reset')} 
                </Button>
            </InputGroup>
        </div>
    )
}