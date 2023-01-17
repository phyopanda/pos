import React, { useState } from 'react'
import { Button, Card, FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { updateCustomer } from '../../services/customer.service';
import { LoadingComponent } from "../general/Loading";
import { setOpenToastAction } from "../../redux/actions/toast.action";

export const CustomerEditComponent = ({ props, item, reload }) => {

    const { id } = props.match.params;
    console.log(item)

    const dispatch = useDispatch();
    const [editItem, setEditItem] = useState(null);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loadingData, setLoadingData] = useState(true);
    const [loading, setLoading] = useState(false);


    
    
    const setData = () => {
        setEditItem(item);
        setName(item.name);
        setEmail(item.email);
        setPhone(item.phone)
    }

    const update = async () => {
        const requestBody = {
            name: name,
            email: email,
            phone: phone
        }

        const fields = Object.keys(requestBody);

        fields.map((field) => {
            if (requestBody[field] === editItem[field]) {
                delete requestBody[field];
            }
        });

        if (Object.keys(requestBody).length > 0) {
            setLoadingData(true);
            setLoading(true);

            const response = await updateCustomer(id, requestBody);

            if (response && response.success === false) {
                dispatch(setOpenToastAction('Customer Update', response.message, 'danger'));
                setLoading(false);
                setLoadingData(false);
                return;
            }
            dispatch(setOpenToastAction('Customer Update', 'Customer Info is updated', 'success'));
            setLoadingData(false);
            setLoading(false);
            reload();
        }
        return;
    }

    useState(() => {
        setLoadingData(true);
        if (item) {
            setData();
            setLoadingData(false);
        }
    }, [item])

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center">
                        <span className="title"> Update Customer List </span>
                        <BsArrowCounterclockwise size={20} className="btn-icon" onClick={() => setData()} />
                    </Card.Title>
                </Card.Header>

                {editItem && !loadingData && (
                    <Card.Body>
                        <FormLabel>Name</FormLabel>
                        <InputGroup className='mb-3'>
                            <FormControl
                                type='text'
                                placeholder='Enter the Name'
                                value={name}
                                onChange={e => setName(e.target.name)} />
                        </InputGroup>

                        <FormLabel>Email</FormLabel>
                        <InputGroup className='mb-3'>
                            <FormControl
                                type='mail'
                                placeholder='Enter the email'
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </InputGroup>

                        <FormLabel>Phone</FormLabel>
                        <InputGroup>
                            <FormControl
                                type='text'
                                placeholder='Enter the Phone'
                                value={phone}
                                onChange={e => setPhone(e.target.value)} />
                        </InputGroup>
                    </Card.Body>
                )}

                {editItem && !loadingData && (
                    <Card.Footer>
                        <Button
                            className="btn-small w-full"
                            disabled={loading}
                            onClick={() => update()}
                        >
                            Update
                        </Button>
                    </Card.Footer>
                )}

                {loadingData && (
                    <Card.Body>
                        <LoadingComponent />
                    </Card.Body>
                )}
            </Card>
        </>
    )
}
