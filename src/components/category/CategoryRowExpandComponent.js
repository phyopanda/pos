import React, { useEffect, useState } from 'react'
import { FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { updateCategory } from '../../services/category.service';
import { messageBoxType } from '../../utilities/native.utility';
import { t, zawgyi } from '../../utilities/translation.utility';

export const CategoryRowExpandComponent = ({ data , refresh }) => {

    const state = useSelector(state => state)
    const { lang } = state;

    const [ category , setCategory ] = useState(null)
    const [ name , setName ] = useState('')
    const [ description , setDescription ] = useState('')

    const update = async (value, fieldName) => {
        if(value === ''){
            window.nativeApi.messageBox.open({title: t('title-update-category'), message: t('invalid-empty'), type: messageBoxType.info});
            return;
        }

        const requestBody = {};
        requestBody[fieldName] = value;

        const updateResponse = await updateCategory(category.id, requestBody);

        if(updateResponse && updateResponse.success === false) {
            window.nativeApi.messageBox.open({title: t('title-update-category'), message: updateResponse.message, type: messageBoxType.info});
            return;
        }

        window.nativeApi.notification.show({title: t('title-update-category'), body: t('success-category-update')});
        refresh(true);
        return;
    }
   
    useEffect(() => { 
        if(data) {
            setCategory(data)
            setName(data.name)
            setDescription(data.description)
        }
    },[data])

  return (
    <div className='container-fluid'>
        <div className='row'>
             <div className='col-md-3 mt-1 mb-1'>
                <FormLabel className={`${zawgyi(lang)}`}> {t('name')} </FormLabel> 
                
                <InputGroup>
                    <FormControl 
                        className={`${zawgyi(lang)}`}
                        type='text'
                        placeholder={t('name')}
                        value={name || ''}
                        onChange = {e => setName(e.target.value)}
                        onKeyPress={e => {
                            if(e.code === 'Enter') {
                                update((name) , 'name')
                            }
                        }}
                    />
                </InputGroup>  
            </div>

            <div className='col-md-4 mt-1 mb-1'>
                <FormLabel className={`${zawgyi(lang)}`}> {t('description')} </FormLabel> 
                <InputGroup>
                    <FormControl 
                        className={`${zawgyi(lang)}`}
                        type='text'
                        placeholder={t('description')}
                        value={description || ''}
                        onChange = {e => setDescription(e.target.value)}
                        onKeyPress={e => {
                            if(e.code === 'Enter') {
                                update((description) , 'description')
                            }
                        }}
                    />
                </InputGroup>   
            </div>
        </div>
    </div>
  )
}
