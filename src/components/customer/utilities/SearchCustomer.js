import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const SearchCustomer = ({ data, searchResult }) => {
    const [searchText, setSearchText] = useState('');
    const [customer, setCustomer] = useState([]);

    const searchCustomer = (value) => {
        setSearchText(value);
        if(value === '' || value === 'clear'){
            setSearchText('');
            searchResult(data);
            return;
        }
        const suggestionName = customer.filter(e => e.name !== null && e.name.toLowerCase().includes(searchText.toLowerCase()));
        // const suggestiionEmail = data.filter(e => e.email !== null && e.email.toLowerCase().includes(searchText.toLowerCase()));
        const suggestionPhone = customer.filter(e => e.phone !== null && e.phone.toLowerCase().includes(searchText.toLowerCase()));
        const suggestionAddress = customer.filter( e => e.address !== null && e.address.toLowerCase().includes(searchText.toLowerCase()));

        const result = suggestionName.concat(suggestionPhone).concat(suggestionAddress);
        searchResult(result);
        return;
    }

    useEffect(() => {
        if(data){
            setCustomer(data);
        }
    },[data])
  return ( 
        <InputGroup>
            <FormControl
            placeholder={t('search-customer')}
            type='text'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => { 
                if(e.key === 'Enter'){
                    searchCustomer(e.target.value);
                }
            }}
            />
            <Button className='ms-2' onClick={() => searchCustomer('clear')}>
                Clear
            </Button>
        </InputGroup>
  )
}

export default SearchCustomer