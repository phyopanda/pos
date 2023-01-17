import React, { useCallback, useEffect, useState } from 'react';
import { Card, FormControl, InputGroup } from 'react-bootstrap';
import { updateChar } from '../../services/numberSpecification.service';
import { BsArrowCounterclockwise } from "react-icons/bs";
import { t } from 'i18next';

export const EditNumberSpecificationForm = ({ props, dataSource, reload }) => {
    
    const [numList, setNumList] = useState([]);
    const [error, setError] = useState(null);
    const [update, setUpdate] = useState(false);

    const reloadApi = () => {
        setError(null);
        reload(true);
    }

    const handleChange = useCallback(async (index, id, e) => {
        numList[index].set_char = e.target.value === '' ? e.target.value : e.target.value.toUpperCase();

        if(e.target.value === '') {
            setUpdate(true);
            return;
        }

        const response = await updateChar(id, {
            set_char: e.target.value
        });

        if(response && response.status === 400) {
            setError(response.message);
            reload(true);
            return;
        }
        
        setError(null);
        setUpdate(true);
        reload(true);
    });

    useEffect(() => {
        setNumList(dataSource);
    },[dataSource]);

    useEffect(() => {
        if(update) {
            setUpdate(false);
        }
    },[update]);

    return(
        <Card>
            <Card.Header>
                <Card.Title className='d-md-flex flex-md-row justify-content-between number-spec-info-title'> 
                <span> {t('edit-number-specification')}</span>
                <div className='icon-btn' onClick={() => reloadApi()}>
                    <BsArrowCounterclockwise size={20} />
                </div>
                </Card.Title>
            </Card.Header>

            <Card.Body>
                <Card.Text className="char-error"> {error} </Card.Text>
                {numList && numList.map((numSpec, index) => {
                    return(
                        <InputGroup
                            className='mb-3 align-items-center'
                            key={`input_id_${index}`}
                        >
                            <label> Target Specification Number - ({numSpec.set_number}) </label>

                            <FormControl 
                                className="ms-1"
                                type='text'
                                placeholder={t('character')}
                                value={numSpec.set_char || ''}
                                onChange={(e) => handleChange(index, numSpec.id, e)}
                                maxLength={1}
                            />
                        </InputGroup>
                    )
                })}
        </Card.Body>
    </Card>
    )
}