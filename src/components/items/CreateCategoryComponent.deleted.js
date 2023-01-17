import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { saveCategory } from "../../services/category.service";
import { t, zawgyi } from "../../utilities/translation.utility";

export const CreateCategoryComponent = ({ props, open, handler, reload }) => {

    const { lang } = props.reducer;
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleClose = () => {
        setName('');
        setDescription('');
        setShow(false);
        handler(false);
    }

    const createCategory = async () => {
        if(name === '') {
            dispatch(setOpenToastAction('Create Category', 'Name field is required', 'danger'));
            return;
        }

        const requestBody = {
            name: name,
            description: description
        }

        const response = await saveCategory(requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Create Category', response.message, 'danger'));
            return;
        }

        handleClose();
        reload();
        return;
    }

    useEffect(() => {
        setShow(open);
    },[open]);

    return(
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    <span className={`${zawgyi(lang)}`}> {t('create-category-title')} </span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <InputGroup className="mb-3">
                    <FormControl
                        className={`${zawgyi(lang)}`}
                        placeholder={t('input-create-name')}
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <FormControl
                        className={`${zawgyi(lang)}`}
                        placeholder={t('input-create-description')}
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </InputGroup>
            </Modal.Body>

            <Modal.Footer className="d-md-flex flex-column justify-content-start align-items-start">
                <div className="d-md-flex flex-row justify-content-start">
                    <Button 
                        className={`btn-small ${zawgyi(lang)}`}
                        onClick={createCategory}
                    >
                        {t('create-category-btn-save')} 
                    </Button>

                    <Button 
                        className={`btn-small ms-2 ${zawgyi(lang)}`} 
                        variant="secondary" 
                        onClick={handleClose}
                    > 
                        {t('create-category-btn-close')} 
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}