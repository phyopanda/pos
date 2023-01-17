import React, { useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setNetworkAddress, setNetworkMAC, setNetworkTypeAction } from "../../redux/actions/config.action";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { checkNetworkConnection } from "../../utilities/networkConnection";
import { t } from "../../utilities/translation.utility";

export const NetworkTypeComponent = ({props}) => {

    const { lang } = props.reducer;
    console.log(props.reducer);
    const dispatch = useDispatch();

    const [networkType, setNetworkType] = useState('');
    const [networkInfo, setNetworkInfo] = useState(null);
    const [networkList, setNetworkList] = useState([]);
    
    const changeNetworkType = (e) => {
        setNetworkType(e);
        setNetworkInfo(networkList[e]);
        dispatch(setNetworkTypeAction(e));
        dispatch(setNetworkAddress(networkList[e].address));
        dispatch(setNetworkMAC(networkList[e].mac));
        dispatch(setOpenToastAction(t('tost-configuration'), t('config-networktype-success'), 'success'));
    }

    useEffect(() => {
        const networkDevices = checkNetworkConnection();
        const selectNetwork = networkDevices.localhost ? networkDevices.localhost : 
            networkDevices.wifi ? networkDevices.wifi :
            networkDevices.ethernet ? networkDevices.ethernet : 
            networkDevices.localhost;
        
        const selectNetworkType = networkDevices.localhost ? 'localhost' : 
            networkDevices.wifi ? 'wifi' :
            networkDevices.ethernet ? 'ethernet': 
            'localhost';

        setNetworkList(networkDevices);
        setNetworkInfo(selectNetwork);
        setNetworkType(selectNetworkType);
    }, []);

    return(
        <>
            { networkInfo && (
                <div className="d-md-flex flex-md-row justify-content-between align-item-center">
                    <div className="d-md-flex flex-md-column">
                        <h3 className='title mb-3'> {t('config-networktype-info')} </h3>
            
                        <span> IP Address - {networkInfo.address} </span>
                        <span> MAC - {networkInfo.mac} </span>
                    </div>
            
                    <div className="d-md-flex flex-md-column">
                        <p> {t('config-networktype-description')} </p>
            
                        <InputGroup className="config-input mb-3">
                            <FormControl 
                                as="select"
                                value={networkType}
                                onChange={e => changeNetworkType(e.target.value)}
                            >
                                {networkList.localhost && (<option value="localhost"> Localhost </option>)}
                                {networkList.ethernet && (<option value="ethernet"> Ethernet Cable </option>)}
                                {networkList.wifi && (<option value="wifi"> WiFi </option>)}
                            </FormControl>
                        </InputGroup>
                    </div>
                </div>  
            )}
        </>
    )
}