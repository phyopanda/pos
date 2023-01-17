import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { zawgyi, t } from '../../utilities/translation.utility';

export const ItemSearchComponent = ({ dataSource, retrive }) => {

    const state = useSelector(state => state);
    const { lang } = state;

    const [text, setText] = useState('');
    const [items, setItems] = useState([]);

    const suggestionSearch = (value) => {
        setText(value);

        if(value === '') {
            retrive(dataSource);
            return;
        }

		const suggestionResultForCode = items.filter((item) => item.code !== null && item.code.toLowerCase().includes(text.toLowerCase()));
		const suggestionResultForName = items.filter((item) => item.eng_name !== null && item.eng_name.toLowerCase().includes(text.toLowerCase()));
		const suggestionResultForModel = items.filter((item) => item.model !== null && item.model.toLowerCase().includes(text.toLowerCase()));
        const suggestionResultForLocation = items.filter((item) => item.location !== null && item.location.toLowerCase().includes(text.toLowerCase()));
        
        const suggestionResult = suggestionResultForCode.
            concat(suggestionResultForName).
            concat(suggestionResultForModel).
            concat(suggestionResultForLocation);

            if(suggestionResult.length > 1){
                if(suggestionResultForName.length === 0){
                    retrive(suggestionResultForModel);
                    return;
                }
               retrive(suggestionResultForName);
               return;
            }

            retrive(suggestionResult);
            return;
    }

    useEffect(() => {
        if(dataSource) {
            setItems(dataSource);
        }
    }, [dataSource]);


    return (
        <div className='d-md-flex flex-md-row justify-content-start align-items-center'>
            <InputGroup>
                <FormControl 
                    className={`${zawgyi(lang)}`}
                    type="text"
                    placeholder={t('search')}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyPress={e => {
                        if(e.code === 'Enter') {
                            suggestionSearch(e.target.value)
                        }
                    }}
                />
            </InputGroup>
        </div>
    )
}