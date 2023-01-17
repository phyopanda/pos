import React, {useState } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { createDevice } from "../../services/device.service";
import { useDispatch } from 'react-redux';
import { setOpenToastAction } from '../../redux/actions/toast.action'

export const CreateeDeviceComponent = ({ disable, reload }) => {

    const [name, setName] = useState('');
    const [ip, setIP] = useState('');
    const [mac, setMac] = useState('');
    const [note, setNote] = useState('');

    const dispatch = useDispatch();

    const create = async () => {
        if(name === '' || ip === '' || mac === '') {
            dispatch(setOpenToastAction('Device Creatae','All fields are required', 'danger'));
            return;
        }

        const requestBody = {
            name: name,
            ip: ip,
            mac: mac,
            note: note
        }

        const response = await createDevice(requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Device Create', response.message, 'danger'));
            return;
        }
        
        reload(true);
    }

    return(
        <Card>
            <Card.Header>
                <Card.Title className="device-create-title"> 
                    <span> Create Device Information </span>
                </Card.Title>
            </Card.Header>

            <Card.Body className="d-md-flex flex-md-column justify-content-md-start">
                <InputGroup className="mb-2">
                    <FormControl
                        type="text"
                        value={name}
                        placeholder="Device Name"
                        onChange={(e) => setName(e.target.value)}
                        disabled={disable}
                    />
                </InputGroup>

                <InputGroup className="mb-2">
                    <FormControl
                        type="text"
                        value={ip}
                        placeholder="IP Address"
                        onChange={(e) => setIP(e.target.value)}
                        disabled={disable}
                    />
                </InputGroup>

                <InputGroup className="mb-2">
                    <FormControl
                        type="text"
                        value={mac}
                        placeholder="MAC Address"
                        onChange={(e) => setMac(e.target.value)}
                        disabled={disable}
                    />
                </InputGroup>

                <InputGroup className="mb-2">
                    <FormControl
                        type="text"
                        value={note}
                        placeholder="Note"
                        onChange={(e) => setNote(e.target.value)}
                        disabled={disable}
                    />
                </InputGroup>

                <Button className="btn-device-create mt-3" onClick={() => create()} disabled={disable}> Create Device </Button>
            </Card.Body>
        </Card>
    )
}