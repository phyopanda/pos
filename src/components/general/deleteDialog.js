import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDelModal } from '../../redux/actions/openDelModal.action';
import { delRequest, postRequest } from '../../services/api.service';
import { messageBoxType } from '../../utilities/native.utility';
import { t, zawgyi } from '../../utilities/translation.utility';

export const DeleteDialog = ({retrive}) => {

    const state = useSelector(state => state);
    const { delModal, lang } = state;

    const messageTitle = t('delete-title');

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
        dispatch(setOpenDelModal({open: false}));
    }

    const confirmDelete = async () => {
        const response = await delRequest(`${delModal.type}/${delModal.id}`);
        if(response && response.success === false) {
            window.nativeApi.messageBox.open({ title: messageTitle, message: response.message, type: messageBoxType.info});
            closeModal();
            return;
        }

        window.nativeApi.notification.show({title: messageTitle, body: t('records-are-deleted')});
        closeModal();
        retrive();
        return;
    }

    const multipleDeleted = async () => {
        const requestBody = delModal.data ? delModal.data.map((value) => {
            return value.id
        }) : [];

        const response = await postRequest(`${delModal.type}/delete`, { data: requestBody });
        if(response && response.success === false) {
            window.nativeApi.messageBox.open({ title: messageTitle, message: response.message, type: messageBoxType.info});
            closeModal();
            return;
        }

        window.nativeApi.notification.show({title: messageTitle, body: t('records-are-deleted')});
        closeModal();
        retrive();
        return;
    }

    useEffect(() => {
        if(delModal) {
            setIsOpen(delModal.open);
        }
    }, [delModal]);

    return(
        <Modal show={isOpen}>
            <Modal.Header>
                <Modal.Title className={`${zawgyi(lang)}`}> {delModal.title} </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className={`${zawgyi(lang)}`}> {delModal.message} </p>
            </Modal.Body>

            <Modal.Footer>
                <Button className={`btn-primary ${zawgyi(lang)}`} onClick={() => delModal.multiple ? multipleDeleted() : confirmDelete()}> {t('btn-delete')} </Button>
                <Button className={`btn-primary ${zawgyi(lang)}`} onClick={() => closeModal()}> {t('btn-cancel')} </Button>
            </Modal.Footer>
        </Modal>
    )
}