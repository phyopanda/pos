import React, { useEffect, useState } from "react";
import { Button, Dropdown, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { t, zawgyi } from "../../../utilities/translation.utility";

const CustomMenu = React.forwardRef(({options, dataSource, chooseCustomer, openCreateDialog}, ref) => {

    const [text, setText] = useState('');
    const [customers, setCustomers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const state = useSelector(state => state);

    const { lang } = state;

    const mergeDeduplicate = (arr) => {
        return [...new Set([].concat(...arr))];
    }

    const searchResult = (text) => {
        setText(text);

        if(text === '') {
            setSuggestions([]);
            return;
        }
        const suggestionResultByName = customers.filter((customer) => customer.name !== null && customer.name.toLowerCase().includes(text.toLowerCase()));
        const suggestionResultByEmail = customers.filter((customer) => customer.email !== null && customer.email.toLowerCase().includes(text.toLowerCase()));
        const suggestionResultByAddress = customers.filter((customer) => customer.address !== null && customer.address.toLowerCase().includes(text.toLowerCase()));
        const suggestionResultByPhone = customers.filter((customer) => customer.phone !== null && customer.phone.includes(text));

        const arrayList = [suggestionResultByName, suggestionResultByEmail, suggestionResultByAddress, suggestionResultByPhone];
        const suggestionResult = mergeDeduplicate(arrayList);

        setSuggestions(suggestionResult);
    }

    const selectedCustomer = (customer) => {
        setText(customer.name);
        setSuggestions([]);
        chooseCustomer(customer);
        return;
    }

    useEffect(() => {
        if(dataSource) {
            setCustomers(dataSource);
        }
    }, [dataSource]);

    return(
        <>
            <div className="d-md-flex flex-md-row justify-content-start align-items-center">
                <FormControl 
                    className={`${zawgyi(lang)}`}
                    type={options.type}
                    placeholder={options.placeholder}
                    value={text}
                    onChange={(e) => searchResult(e.target.value)}
                />

                <Button 
                    className={`ms-1 ${lang === 'unicode' ? 'btn-width' : 'btn-fix-width'}`}
                    onClick={() => openCreateDialog(true)}
                > 
                    <span className={`${zawgyi(lang)}`}> {t('btn-create-customer')}  </span>
                </Button>
            </div>

        <div className="customer-dropdown-wrapper">
            {suggestions.length > 0 && suggestions.map((value, index) => {
                return(
                    <Dropdown.Item 
                        key={`suggestion_id_${index}`}
                        eventKey={value.id}
                        onClick={() => selectedCustomer(value)}
                        onKeyPress={(e) => {
                            if(e.code === 'Enter') {
                                selectedCustomer(value)
                            }
                        }}
                    >
                        <span className={`${zawgyi(lang)}`}> {value.name} </span>
                    </Dropdown.Item>
                )
            })}
        </div>
        </>
    )
});

export const CustomerAutoCompleteDropDown = ({dataSource, chooseCustomer, openCreateDialog}) => {

    const dropdownOptions = {
        type: "text",
        placeholder: t('placeholder-customer-search'),
        searchFieds: ['name', 'phone', 'email', 'address']
    }

    return(
        <Dropdown>
            <Dropdown.Menu 
                show={true}
                as={CustomMenu} 
                options={dropdownOptions} 
                dataSource={dataSource} 
                chooseCustomer={(e) => chooseCustomer(e)}
                openCreateDialog={(e) => openCreateDialog(e)}
            />
        </Dropdown>
    );
}