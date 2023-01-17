import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { updatePercentage } from '../../services/item.service';
import { messageBoxType } from '../../utilities/native.utility';
import { t, zawgyi } from '../../utilities/translation.utility';

export const ItemPercentageChangeComponent = ({ reload }) => {
    const state = useSelector(state => state);
    const { lang } = state;

    const [percentage, setPercentage] = useState('');

    const changePercentage = async () => {
        if (percentage === '' || Number(percentage) === 0 || !Number(percentage)) {
            window.nativeApi.messageBox.open({ title: t('title-update-item-percentage'), message: t('invalid-number'), type: messageBoxType.info});
            return;
		}

        const requestBody = {
			type: Number(percentage) < 0 ? 'decrement' : 'increment',
			amount: Math.abs(percentage)
        };

        const response = await updatePercentage(requestBody);

        if(response && response.success === false) {
            window.nativeApi.messageBox.open({ title: t('title-update-item-percentage'), message: response.message, type: messageBoxType.info});
            return;
        }

        window.nativeApi.notification.show({title: t('success-item-percentage-update'), body: t('success-item-update')});
        setPercentage('');
        reload(true);
    }

    return(
        <div className=''>
            <InputGroup>
                <FormControl 
                    className={`${zawgyi(lang)}`}
                    type="text"
                    placeholder={t('change-all-percentage')}
                    value={percentage}
                    onChange={e => setPercentage(e.target.value)}
                    onKeyPress={e => {
                        if(e.code === 'Enter') {
                            changePercentage();
                        }
                    }}
                />
            </InputGroup>
        </div>
    )
}