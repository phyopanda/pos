import React, { useState } from "react";
import { Alert, Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { updateCategory } from "../../services/category.service";
import { setOpenDelModal } from "../../redux/actions/openDelModal.action";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { t } from 'i18next';
import { messageBoxType } from "../../utilities/native.utility";

export const EditCategoryComponent = ({ props, category, isDelete, reload}) => {

    const { id } = props.match.params;
    
    const dispatch = useDispatch();

    const [ loading, setLoading ] = useState(false);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    const setData = async () => {
        setName(category.name),
        setDescription(category.description);
        return;
    }

    const update = async () => {
        const {nativeApi} = window;
        if(name === '') {
            nativeApi.messageBox.open({
                title: 'Update Category',
                message: 'Category name is required',
                type: messageBoxType.error
            })
            return;
        }

        const requestBody = {
            name: name,
            description: description
        }

        if(requestBody.name === category.name) {
            delete requestBody.name;
        }

        const response = await updateCategory(id, requestBody);

        if(response && response.success===false){
            nativeApi.messageBox.open({
                title: 'Update Category',
                message: response.message,
                type: messageBoxType.error
            })
            setLoading(false);
            return;
        };
        nativeApi.messageBox.open({
            title: 'Update Category',
            message: 'Category is updated',
            type: messageBoxType.info
        })
        setLoading(false);
        reload();
        return;
    }

    const deleteCategory = () => {
        dispatch(setOpenDelModal({
            open: true,
            title: 'Delete Record',
            message: 'Are you sure to delete record',
            id: category.id,
            type: 'category',
            multiple: false
        }));
    }

    useState(() => {
        if(category){
            setData();
        }
    }, [category]);

    return(
        <>
            <Card>
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center"> 
                        <span> {t('category')} </span>
                        <BsArrowCounterclockwise size={20} className="btn-icon" onClick={() => setData()} />
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <Alert variant="warning">
                        <Alert.Heading> Warning for delete category </Alert.Heading>
                        <p> Once the item type is used, the item type cannot be delete </p>
                    </Alert>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            placeholder={t('name')}
                            value={name || ''}
                            onChange={e => setName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            placeholder={t('description')}
                            value={description  || ''}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </InputGroup>
                </Card.Body>
                                
                <Card.Footer>
                    <Button 
                        className="btn-small w-full"
                        disabled={loading}
                        onClick={() => update()}
                    >
                        {t('confirm')}
                    </Button>

                    {isDelete && (
                        <Button 
                            className="btn-small btn-danger w-full mt-1"
                            disabled={loading}
                            onClick={() => deleteCategory()}
                         >
                            Delete
                        </Button> 
                    )}
                </Card.Footer>
            </Card>
        </>
    )

}