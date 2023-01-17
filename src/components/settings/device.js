import React, { useCallback, useEffect, useState } from "react";
import { CreateeDeviceComponent } from "./createDevice";
import { getDevices } from "../../services/device.service";
import { getDevice } from "../../services/license.service";
import { DeviceListComponent } from "./deviceList";
import { useDispatch } from "react-redux";
import { setOpenToastAction } from "../../redux/actions/toast.action";

export const DeviceComponent = ({ props }) => {
    const dispatch = useDispatch();

    const [devices, setDevices] = useState([]);
    const [disable, setDisable] = useState(false);

    const refresh = (e) => {
        if(e) {
            fetchApi();
        }
    }

    const fetchApi = useCallback(async() => {
        const response = await getDevices();

        if((response && response.success === false)) {
            dispatch(setOpenToastAction('Device List', response.messsage, 'danger'));
            return;
        }

        const regInfo = await getDevice();

        if((regInfo && regInfo.success === false)) {
            dispatch(setOpenToastAction('Licnese', regInfo.messsage, 'danger'));
            return;
        }

        const limit = Number(regInfo.num_device);

        if(limit <= response.length) {
            setDisable(true);
        }

        setDevices(response);
        return;
    },[]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    return(
        <div className="row">
            <div className="col-md-4">
                <CreateeDeviceComponent disable={disable} reload={(e) => refresh(e)} />
            </div>

            <div className="col-md-8">
                <DeviceListComponent props={props} dataSource={devices} reload={e => refresh(e)} />
            </div>
        </div>
    )
}