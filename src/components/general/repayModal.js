import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setOpenRepaymentModal } from '../../redux/actions/openDelModal.action';

export const RepayDialog = ({ props, reload }) => {

    const { delModal } = props.reducer;
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(0);

    const closeModal = () => {
        setIsOpen(false);
        dispatch(setOpenRepaymentModal({open: false}));
    }

    useEffect(() => {
        if(delModal) {
            setIsOpen(delModal.open);
        }
    }, [delModal]);

    return(
        <Modal show={isOpen}>
            <Modal.Header>
                <Modal.Title> Add Repayment </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <span>{moment().format('dd,mm,yyyy')}</span>
                <input type='text' placeholder="Enter Repay Amount" value={value}/>
            </Modal.Body>

            <Modal.Footer>
                <Button className="btn-small"> Add Repayment </Button>
                <Button className="btn-small btn-secondary" onClick={() => closeModal()}> Close </Button>
            </Modal.Footer>
        </Modal>
    )
}