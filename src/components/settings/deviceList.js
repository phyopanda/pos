import React, { useState } from "react";
import { Badge, Button, Card, FormControl, InputGroup, Table } from "react-bootstrap";
import { BsArrowUpLeftSquare, BsCheckCircle, BsDashCircle } from "react-icons/bs";
import { updateDevice } from "../../services/device.service";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { useDispatch } from "react-redux";

const network = {
    ip: localStorage.getItem('SET_NETWORK_ADDRESS') ? localStorage.getItem('SET_NETWORK_ADDRESS') : null,
    mac: localStorage.getItem('SET_NETWORK_MAC') ? localStorage.getItem('SET_NETWORK_MAC') : null,
}

export const DeviceListComponent = ({ props, dataSource, reload }) => {

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('');
    const [ip, setIp] = useState('');
    const [mac, setMac] = useState('');
    const [note, setNote] = useState('');
    const [selectedDevice, setSelectedDevice] = useState(null);

    const openEditForm = (value) => {
        setEdit(true);
        setIp(value.ip);
        setMac(value.mac);
        setName(value.name);
        setNote(value.note);
        setSelectedDevice(value);
    }

    const update = async () => {
        let updateRequest = {};

        if(name === '' || ip === '' || mac === '') {
            dispatch(setOpenToastAction('Edit Device', 'All fields are required','danger'));
            return;  
        }

        if(selectedDevice.ip !== ip) {
            updateRequest.ip = ip
        }

        if(selectedDevice.mac !== mac) {
            updateRequest.mac = mac
        }

        updateRequest.name = name;
        updateRequest.note = note;

        const response = await updateDevice(selectedDevice.id, updateRequest);

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Edit Device', response.message, 'danger'));
            return;
        }

        reload(true);
        setEdit(false);
    }

    const changeStatus = async(id, status) => {
        const response = await updateDevice(id, {active: status});

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Device Status', response.message, 'danger'));
            return;
        }

        dispatch(setOpenToastAction('Device Status', 'Device Status Changed Successfully', 'success'));
        reload(true);
        setEdit(false);
    }

    return(
        <Card>
            <Card.Header>
            <Card.Title className="device-list-title"> Device Lists </Card.Title>
            </Card.Header>

            {edit && (
                <Card.Body className="d-md-flex flex-column">
                    <InputGroup>
                        <FormControl
                            placeholder="Device Name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <FormControl 
                            placeholder="IP Address"
                            type="text"
                            value={ip}
                            onChange={e => setIp(e.target.value)}
                        />

                        <FormControl 
                            placeholder="MAC Address"
                            type="text"
                            value={mac}
                            onChange={e => setMac(e.target.value)}
                        />

                        <FormControl 
                            placeholder="Note"
                            type="text"
                            value={note || ''}
                            onChange={e => setNote(e.target.value)}
                        />

                        <Button className="btn-device-update ms-2" onClick={() => update()}> Update </Button>
                    </InputGroup>
                </Card.Body>
            )}

            <Card.Body className="d-md-flex flex-row justify-content-md-evenly flex-md-wrap">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Device Name </th>
                            <th> IP Address </th>
                            <th> MAC Address </th>
                            <th> Note </th>
                            <th> Status </th>
                            <th> Option </th>
                        </tr>
                    </thead>

                    <tbody>
                        {dataSource.length > 0 && dataSource.map((value, index) => {
                            return(
                                <tr key={`device_id_${index + 1}`}>
                                    <td> {index + 1} </td>
                                    <td> {value.name} </td>
                                    <td> {value.ip} </td>
                                    <td> {value.mac} </td>
                                    <td> {value.note} </td>
                                    <td>
                                        <Badge bg={value.active === true ? 'success' : 'danger'}>
                                            {value.active === true ? 'Active' : 'Disable'}
                                        </Badge>
                                    </td>
                                    <td>
                                        {network.ip === value.ip || network.mac === value.mac ? (
                                            <span> ----- </span> 
                                        ) : (
                                            <>
                                                <BsArrowUpLeftSquare 
                                                    className="btn-icon-edit"
                                                    size={20} 
                                                    onClick={() => openEditForm(value)} 
                                                />
                                                {
                                                    value.active ? (
                                                        <BsDashCircle 
                                                            className="ms-3 btn-icon-edit danger"
                                                            size={20} 
                                                            onClick={() => changeStatus(value.id, false)}
                                                        />
                                                    ) : (
                                                        <BsCheckCircle
                                                            className="ms-3 btn-icon-edit success"
                                                            size={20}
                                                            onClick={() => changeStatus(value.id, true)}
                                                        />
                                                    )
                                                }
                                            </>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}