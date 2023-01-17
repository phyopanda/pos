import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { pages } from '../../assets/i18n/mm.json';

export const LicenseComponent = ({ dataSource }) => {

    return(
        <>
            <div className='setting-content-wrapper'>
                <h3 className='license-header'> {`${pages.setting.header_title} - ${dataSource.label}`} </h3>

                <div className='license-wrapper'>
                    <InputGroup className='license-input-group'>
                        <FormControl
                            type='text'
                            placeholder={`license key`}
                        />
                        
                        <Button className='btn-ok'> Save </Button>
                    </InputGroup>
                </div>
            </div>
        </>
    )

}