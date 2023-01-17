import React, { useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";


const CustomMenu = React.forwardRef(({options, dataSource, chooseItem}, ref) => {

    const [text, setText] = useState('');
    const [items, setItems] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const lang = useSelector(state => state.lang);

    const searchResult = (text) => {
        setText(text);

        if(text === '') {
            setSuggestions([]);
            return;
        }

        let suggestionResult = [];

        if(options.for === 'items') {
            const suggestionResultForCode = items.filter((item) => item.code.toLowerCase().includes(text.toLowerCase()));
            const suggestionResultForName = items.filter((item) => item.eng_name.toLowerCase().includes(text.toLowerCase()));
            const resultConnect = suggestionResultForCode.concat(suggestionResultForName);
            setSuggestions(resultConnect);
            return;
        }

        suggestionResult = items.filter((item) => item[options.search_name].toLowerCase().includes(text.toLowerCase()));

        setSuggestions(suggestionResult);
       
    }

    const selectedItem = (item) => {
        setText(item[options.search_name]);
        setSuggestions([]);
        chooseItem(item);
        return;
    }

    useEffect(() => {
        if(dataSource) {
            setItems(dataSource);
        }
    }, [dataSource]);

    return(
        <>
            <FormControl 
                type={options.type}
                placeholder={options.placeholder}
                value={text}
                onChange={(e) => searchResult(e.target.value)}
            />

        <div className={`dropdown-wrapper ${options.for === 'items' ? 'items-dropdown-width' : ''}`}>
            {suggestions.length > 0 && suggestions.map((value, index) => {
                return(
                    <Dropdown.Item 
                        key={`suggestion_id_${index}`}
                        eventKey={value.id}
                        onClick={() => selectedItem(value)}
                        onKeyPress={(e) => {
                            if(e.code === 'Enter') {
                                selectedItem(value)
                            }
                        }}
                    > 
                        {options.for === 'items' ? `${value.code} [${value.eng_name}]` : value[options.search_name]}
                    </Dropdown.Item>
                )
            })}
        </div>
        </>
    )
});

export const AutoCompleteDropDown = ({dataSource, inputOption, chooseItem}) => {
    return(
        <Dropdown>
            <Dropdown.Menu 
                show={true}
                as={CustomMenu} 
                options={inputOption} 
                dataSource={dataSource} 
                chooseItem={(e) => chooseItem(e)}
            />
        </Dropdown>
    );
}