import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { pages } from '../../assets/i18n/mm.json';

export const NetworkConnection = ({ dataSource }) => {

    return(
        <>
            <div className='setting-content-wrapper'>
                <h3 className='network-header'> {`${pages.setting.header_title} - ${dataSource.label}`} </h3>

                <div className='network-wrapper'>
                    <InputGroup className='network-input-group'>
                        <FormControl
                            type='text'
                            placeholder={`localhost`}
                        />

                        <FormControl
                            type='text'
                            placeholder={`port`}
                        />

                        <FormControl
                            type='text'
                            placeholder={`database username`}
                        />

                        <FormControl
                            type='password'
                            placeholder={`password`}
                        />

                        <Button className='btn-ok'> Save </Button>
                    </InputGroup>
                </div>
            </div>
        </>
    )

}