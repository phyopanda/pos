import React, { useEffect, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export const InvoiceTableHeader = ({ props, filterResult, data }) => {


    const show =() => {
        console.log(data.map(e => e.invoice_id))
    }

    const search = (text) => {
        // const filteredItem = data.filter((result, index) => {

            // let filterText = result.invoice_id ? result.invoice_id : '';
    
            // if(Number(result.invoice_id)) {
            //     filterText = result.invoice_id.toString();
            //     if(filterText.includes(text)) {
            //         return result;
            //     }
            // }
        let resultData = data.filter((result, index) => {
            let filterText = result.invoice_id.toString();
            if(filterText.includes(text)){
                return result;
            };
        })
        filterResult(resultData);
    }
    return (
        <>
        <InputGroup>
            <FormControl 
            type='text'
            placeholder='search with Invoid ID'
            onChange={(e) => {
                search(e.target.value);  
            }}
            />
        </InputGroup>
        </>
    )
}