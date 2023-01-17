import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, FormControl, FormLabel, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { createCustomer, getCustomerList } from '../../services/customer.service';

export const CustomerCreateComponent = ({ reload }) => {

    const [ name, setName] = useState('');
    const [ email, setEmail] = useState('');
    const [ phone, setPhone] = useState('');
    const [ btnLoading, setBtnLoading] = useState(false);

    const dispatch = useDispatch();

    const customerCreate = async() =>{
        if(name === '' || email === '' || phone === '') {
            dispatch(setOpenToastAction('Create Customer', 'All Field Are Required' , 'danger'));
            return;
        }

        const requestBody = {
            name: name,
            email: email,
            phone:phone,
        }

        setBtnLoading(true);

        const response = await createCustomer(requestBody);
        if(response && response.success === false) {
            dispatch(setOpenToastAction('Create Customer', response.message , 'danger'));
            setBtnLoading(false);
            return;
        }

        reload(true);
        setBtnLoading(false);
        return;
    }
    
  return (
    <>
    <Card className='mt-3'>
        <Card.Header >
            <Card.Title> Create Customer</Card.Title>    
        </Card.Header>
        <Card.Body>
            <FormLabel>Name</FormLabel>
            <InputGroup className='mb-3'>
                <FormControl 
                type='text'
                placeholder='Enter the Name'
                value={name}
                onChange={e => setName(e.target.value)}
                />
            </InputGroup>

            <FormLabel>Email</FormLabel>
            <InputGroup className='mb-3'>
                <FormControl 
                type='mail'
                placeholder='Enter the Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </InputGroup>

            <FormLabel>Phone Number</FormLabel>
            <InputGroup className='mb-3'>
                <FormControl 
                type='text'
                placeholder='Enter the phone number'
                value={phone}
                onChange={e => setPhone(e.target.value)}/>
            </InputGroup>
        </Card.Body>

        <Card.Footer className="d-flex flex-column">
            <Button className='btn-small mb-3'
            onClick={() => customerCreate()}
            disabled={btnLoading}>
                Save
            </Button>
        </Card.Footer>
    </Card>


    </>
  )
}
