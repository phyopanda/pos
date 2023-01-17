import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setDeviceTypeAction } from "../../redux/actions/config.action";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { t } from "../../utilities/translation.utility";

export const DeviceTypeComponent = ({ props }) => {

    const { lang } = props.reducer;

    const dispatch = useDispatch();

    const [device, setDevice] = useState('laptop');
    
    const setDeviceType = (e) => {
        setDevice(e.target.value)
        dispatch(setDeviceTypeAction(e.target.value));
        dispatch(setOpenToastAction(t('tost-configuration'), t('config-devicetype-set-success'), 'success'));
    };

    return(
        <>
            <div className="d-md-flex flex-md-column">
                <p> {t('config-devicetype-description')} </p>

                <InputGroup className="config-input">
                    <FormControl 
                        as="select"
                        value={device}
                        onChange={e => setDeviceType(e)}
                    >
                        <option value="laptop"> {t('laptop')} </option>
                        <option value="pc"> {t('computer')} </option>
                    </FormControl>
                </InputGroup>
            </div>
        </>
    )
}