import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, Card, FormControl, FormLabel, FormSelect, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { saveItem } from "../../services/item.service";
import { messageBoxType } from '../../utilities/native.utility';
import { t, zawgyi } from "../../utilities/translation.utility";

export const ItemCreateComponent = ({ categoriesList }) => {
    const state = useSelector(state => state);
    const { lang } = state;

    const history = useHistory();

    const [btnLoading, setBtnLoading] = useState(false);
    const [categories, setCategories] = useState(categoriesList);
    const [category, setCategory] = useState('default');
    const [eng_name, setEngName] = useState('');
    const [mm_name, setMName] = useState('');
    const [model, setModel] = useState('');
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [location, setLocation] = useState('');
    const [code, setCode] = useState('');
    const [percentage, setPercentage] = useState(0);

    const messageBoxTitle = t('title-item-create');

    const itemSave = async () => {
        // if(code === '') {
        //     window.nativeApi.messageBox.open({title: messageBoxTitle, message: `${t('code-is-required')}`, type: messageBoxType.info});
        //     return;
        // }

        // if(category === 'select-the-categories'){
        //     window.nativeApi.messageBox.open({title: messageBoxTitle, message: `${t('please-select-the-categories')}` , type: messageBoxType.info});
        //     return;
        // }
        
        // if(eng_name === '') {
        //     window.nativeApi.messageBox.open({title: messageBoxTitle, message: `${t('english-name-is-required')}`, type: messageBoxType.info});
        //     return;
        // }

        const requestBody = {
            eng_name: eng_name,
            mm_name: mm_name,
            model: model,
            qty: qty,
            price: price,
            location: location,
            category_id: category,
            code: code,
            percentage: percentage
        }

        setBtnLoading(true);

        const response = await saveItem(requestBody);
        if(response && response.success === false) {
            window.nativeApi.messageBox.open({title: messageBoxTitle, message: response.message, type: messageBoxType.info});
            setBtnLoading(false);
            return;
        }
        setBtnLoading(false);
        window.nativeApi.notification.show({title: messageBoxTitle, body: t('success-item-create')});
        history.push('/inventory');
    }

    useEffect(() => {
        setCategories(categoriesList);

        // if(categoriesList.length > 0) {
        //     setCategory(categoriesList[0].id);
        // } 
    }, [categoriesList]);

    return(
        <Card className='mt-3'>
            <Card.Header>
                <Card.Title className="fontsize"> {t('create-new-item')} </Card.Title>
            </Card.Header>

            <Card.Body>
                <>
                    <FormLabel className={`${zawgyi(lang)}`}> {t('category')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormSelect
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option value={'default'} disabled > {t('select-the-categories')} </option>
                            {categories.length > 0 && categories.map((cat, index) => {
                                return(
                                    <option key={`cat_id_${index}`} value={cat.id}> { cat.name} </option>
                                )
                            })}
                        </FormSelect>
                    </InputGroup>
                    
                    <FormLabel> {t('materail-code')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={t('materail-code')}
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel className={`${zawgyi(lang)}`}> {t('name')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={t('name')}
                            value={eng_name}
                            onChange={e => setEngName(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel className={`${zawgyi(lang)}`}> {t('myanmar-name')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={t('myanmar-name')}
                            value={mm_name}
                            onChange={e => setMName(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel className={`${zawgyi(lang)}`}> {t('model')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={t('model')}
                            value={model}
                            onChange={e => setModel(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel className={`${zawgyi(lang)}`}> {t('quantity')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={t('quantity')}
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel className={`${zawgyi(lang)}`}> {t('price')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={t('price')}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel className={`${zawgyi(lang)}`}> {t('percentage')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={t('percentage')}
                            value={percentage}
                            onChange={e => setPercentage(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel className={`${zawgyi(lang)}`}> {t('location')} </FormLabel>
                    <InputGroup>
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={t('location')}
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </InputGroup>
                </>
            </Card.Body>

            <Card.Footer className="d-flex flex-column">
                <Button 
                    className={`btn-primary mb-3 ${zawgyi(lang)}`}
                    onClick={() => itemSave()}
                    disabled={btnLoading}
                >
                    {t('confirm')}
                </Button>
            </Card.Footer>
        </Card>
    )
}