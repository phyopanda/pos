import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setDatabaseUrl } from "../../redux/actions/config.action";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { t } from 'i18next';

export const DatabaseURLComponent = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [url, setUrl] = useState('');
    
    const saveUrl = () => {

        if(url === '') {
            dispatch(setOpenToastAction('Configuration Setting', `${t('ip-address-is-required')}`, 'danger'));
            return;
        }

        dispatch(setDatabaseUrl(url));

        dispatch(setOpenToastAction('Configuration Setting', `${t('database-url-is-updated')}` , 'success'));
        history.push('/');
        return;
    };

    return(
        <>
            <div className="d-md-flex flex-md-column">
                <p> {t('enter-ip-address-for-database-connection')} </p>

                <InputGroup className="config-input-500">
                    <FormControl 
                        type="text"
                        placeholder={t('enter-database-ip-address')}
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />

                    <Button className="btn btn-samll" onClick={() => saveUrl()}> {t('confirm')} </Button>
                </InputGroup>
            </div>
        </>
    )
}