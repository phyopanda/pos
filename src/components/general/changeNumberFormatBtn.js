import React, { useState } from "react";
import { FormSelect, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setNumberFormatAction } from "../../redux/actions/numberFormat.action";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { getNumberSpecList } from "../../services/numberSpecification.service";
import { setCharAction } from '../../redux/actions/charaster.action';
import { t, zawgyi } from "../../utilities/translation.utility";

export const ChangeNumberFormatBtn = ({ props }) => {
    const state = useSelector(state => state);
    const { lang, numberFormat } = state;
    
    const [format, setFormat] = useState(numberFormat);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const response = await getNumberSpecList();
        if(response && response.success === false) {
            dispatch(setOpenToastAction('Number Specification', response.message));
            return;
        }

        return response;
    }

    const changeNumberFormat = async (value) => {
        if(value === 'character') {
            const data = await fetchData();

            const nullValue = data.filter(value => value.set_char === null);

            if(nullValue.length !== 0) {
               dispatch(setOpenToastAction('Number Specification', "Number charaster set can't be used, Please check number specification setting", 'danger'));
               setFormat(numberFormat);
               return;
            }

            if(nullValue.length === 0) {
                dispatch(setCharAction(data));          
            }
        }

        dispatch(setNumberFormatAction(value)); 
        setFormat(value);
    }

    return(
        <div className="d-md-flex flex-md-column justify-content-start align-items-center">
            <label className={`mb-1 ${zawgyi(lang)}`}> {t('change-number-format')} </label>
            <InputGroup className='select-input-group'>
                <FormSelect 
                    className={`${zawgyi(lang)}`}
                    onChange={(e) => changeNumberFormat(e.target.value)}
                    defaultValue={format}
                >
                    <option value='number'> {t('number')} </option>
                    <option value='character'> {t('character')} </option>
                </FormSelect>
            </InputGroup>
        </div>
    )
}

