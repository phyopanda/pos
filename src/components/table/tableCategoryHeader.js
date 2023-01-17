import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { autocomplete } from '../../utilities/table.utility';
import { t, zawgyi } from '../../utilities/translation.utility';
import { BsCloudUpload, BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';

import '../../assets/css/components/table-header.css';

export const SaleTableHeaderComponent = ({ type, props, dataSource, searchColumns, placeholder, filterResult, categories }) => {
    const { lang } = props.reducer;

    const [text, setText] = useState('');
    const [filterType, setFilterType] = useState(searchColumns[0]);
    const [openExportSetting, setOpenExportSetting] = useState(false);
    const [selectCategory   , setSelectCategory] = useState('');
    const [categoryItems, setCategoryItems] = useState([]);


    const autoSearch = (text) => {
        const result = autocomplete(dataSource, text, filterType);
        setText(text);
        filterResult(result);
    }

    const reset = () => {
        setFilterType(searchColumns[0]);
        setText('');
        filterResult(dataSource);
    }

    const calValue = (initialValue = []) => {
        initialValue.push(categories.map( e => e.name));
        setSelectCategory(initialValue[0][0]);
        console.log(selectCategory);
    }

    useEffect(() => {
        if(categories){
            calValue();

        }
    },[categories])

    const categoryItemList = (categoryName) => {
        const a = [];
            a.push(dataSource.filter((item, index) => {
            item.category === categoryName;
        }));
        setCategoryItems(a);
    }
    return(
        <div className='table-header mb-2'>
            <div className='table-header-left'>
                <InputGroup>
                    <FormControl
                    as={'select'}
                    placeholder="select category"
                    value={selectCategory}
                    onChange={(e) => {
                        setSelectCategory(e.target.value);
                    }}
                    >

                        {selectCategory? categories.map((category, index) => {
                        return (
                            <option key={`category id ${index}`}>{category.name}</option>
                        )
                    }): []}
                    </FormControl>
                </InputGroup>
            </div>

            <InputGroup className='table-header-right'>
                <FormControl
                    className={`input-small ${zawgyi(lang)}`}
                    type='text'
                    placeholder={placeholder}
                    value={text}
                    onChange={e => autoSearch(e.target.value)}
                />

                <FormControl
                    className={`select-input-group ${zawgyi(lang)}`}
                    as={'select'}
                    value={filterType}
                    onChange={(e) => {
                        setFilterType(e.target.value);
                        setText('');
                        filterResult(dataSource)
                    }}
                >
                    {searchColumns.map((filter, index) => {
                        return(
                             <option key={`filter_column_id_${index}`}> {filter} </option>
                        )
                    })}
                </FormControl>
                    
                <Button 
                    className={`btn-small ${zawgyi(lang)}`}
                    onClick={() => reset()}
                > 
                    {t('btn-table-search-reset')} 
                </Button>
            </InputGroup>

           {openExportSetting && (
                <ItemExportToExcel 
                    props={props} 
                    open={openExportSetting} 
                    close={e => setOpenExportSetting(e)}
                />
           )}
        </div>
    )
}