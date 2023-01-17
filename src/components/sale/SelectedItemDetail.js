import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { updateItem } from "../../services/item.service";
import { messageBoxType } from "../../utilities/native.utility";
import { t, zawgyi } from "../../utilities/translation.utility";

const tableHeader = [t('materail-code'), t('name'), t('model'), t('label-brand'), t('quantity'), t('price'), t('percentage'), t('sale-price'), t('location'), t('placeholder-update-percentage')];

export const SelectedItemDetail = ({ selectedItem, reloadItem }) => {
    const state = useSelector(state => state);
    const { nativeApi } = window;
    const { lang } = state;

    const [item, setItem] = useState(null);
    const [percentage, setPercentage] = useState('');
    const [showPrice, setShowPrice] = useState(false);
    const [showPercentage, setShowPercentage] = useState(false);

    const messageBoxTitle = t('title-update-item-percentage');

    const changePercentage = (percentageValue) => {

        if (Number(percentageValue) > 100) {
            nativeApi.messageBox.open({ title: messageBoxTitle, message: t('percentage-less-than-100'), type: messageBoxType.info });
            setPercentage('');
            return;
        }

        if (!Number(percentageValue) && percentageValue !== '') {
            nativeApi.messageBox.open({ title: messageBoxTitle, message: t('invalid-percentage'), type: messageBoxType.info });
            setPercentage('');
            return;
        }
        
        setPercentage(percentageValue);
        return;
    }

    const save = async () => {
        const requestBody = {
            percentage: percentage
        };

        const response = await updateItem(item.id, requestBody);

        if (response && response.success === false) {
            nativeApi.messageBox.open({ title: messageBoxTitle, message: response.message, type: messageBoxType.info });
            return;
        }

        nativeApi.notification.show({ title: messageBoxTitle, body: t('success-item-percentage-update') });

        item.percentage = percentage;
        item.sell_price = ((Number(item.price) * Number(percentage)) / 100) + Number(item.price);
        setPercentage('');
        reloadItem(true);
        return;
    }

    useEffect(() => {
        if (selectedItem) {
            setItem(selectedItem);
        }
    }, [selectedItem]);

    return (
        <>
            {item && (
                <div className="table-responsive">
                    <table className="table selected-item-table">
                        <thead>
                            <tr>
                                {tableHeader.map((value, index) => {
                                    return (
                                        <td key={`sale_table_header_id_${index}`}> <span className={`${zawgyi(lang)}`}> {value} </span> </td>
                                    )
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td> {item.code} </td>
                                <td> {item.name} </td>
                                <td> {item.model} </td>
                                <td> {item.category ? item.category.name : null} </td>
                                <td> {item.totalQty} </td>
                                <td>
                                    <span className="clickable" onClick={() => setShowPrice(!showPrice)}>
                                        {showPrice ? `${numeral(item.price).format('0,0')} MMK` : `${item.price.toString().charAt(0)} XXX... MMK`}
                                    </span>
                                </td>
                                <td>
                                    <span className="clickable" onClick={() => setShowPercentage(!showPercentage)}>
                                        {showPercentage ? `${item.percentage} %` : `${item.percentage.toString().charAt(0)} XX (%)`}
                                    </span>
                                </td>
                                <td> {numeral(item.sell_price).format('0,0')} MMK </td>
                                <td> {item.location} </td>
                                <td>
                                    <InputGroup>
                                        <FormControl
                                            type="text"
                                            placeholder={t('placeholder-update-percentage')}
                                            value={percentage}
                                            onChange={(e) => changePercentage(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.code === 'Enter') {
                                                    save();
                                                }
                                            }}
                                        />
                                    </InputGroup>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )

}