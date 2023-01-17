import React, { useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { t, zawgyi } from "../../../utilities/translation.utility";

const CustomMenu = React.forwardRef(({ options, dataSource, chooseItem, setDisable }, ref) => {
    const state = useSelector(state => state);

    const { lang } = state;

    const [text, setText] = useState('');
    const [items, setItems] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const mergeDeduplicate = (arr) => {
        return [...new Set([].concat(...arr))];
    }

    const searchResult = (text) => {
        setText(text);

        if(text === '') {
            setSuggestions([]);
            return;
        }

        const suggestionResultByEngName = items.filter((item) => item.eng_name !== null && item.eng_name.toLowerCase().includes(text.toLowerCase()));
        const suggestionResultByMyName = items.filter((item) => item.mm_name !== null && item.mm_name.toLowerCase().includes(text.toLowerCase()));
        const suggestionResultByCode = items.filter((item) => item.code !== null && item.code.toLowerCase().includes(text.toLowerCase()));
        const suggestionResultByModel = items.filter((item) => item.model !== null && item.model.toLowerCase().includes(text.toLowerCase()));
        const suggestionResultByLocaiton = items.filter((item) => item.location !== null && item.location.toLowerCase().includes(text.toLowerCase()));

        const arrayLists = [suggestionResultByEngName, suggestionResultByMyName, suggestionResultByCode, suggestionResultByModel, suggestionResultByLocaiton];
        const suggestionResult = mergeDeduplicate(arrayLists);

        setSuggestions(suggestionResult);
    }

    const selectedItem = (item) => {
        setText(item.eng_name);
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
            <div className="d-md-flex flex-md-row justify-content-start align-items-center w-400">
                <FormControl
                    className={`item-autosearch-input ${zawgyi(lang)}`}
                    type={options.type}
                    placeholder={options.placeholder}
                    value={text}
                    onChange={(e) => {
                        searchResult(e.target.value);
                        setDisable(true);
                    }}
                />
            </div>

        <div className="item-dropdown-wrapper">
            {suggestions.length > 0 && suggestions.map((value, index) => {
                return(
                    <Dropdown.Item 
                        key={`suggestion_item_id_${index}`}
                        eventKey={value.id}
                        onClick={() => selectedItem(value)}
                        onKeyPress={(e) => {
                            if(e.code === 'Enter') {
                                selectedItem(value)
                            }
                        }}
                    >
                        <span> {value.code} - [{value.eng_name}] </span>
                    </Dropdown.Item>
                )
            })}
        </div>
        </>
    )
});

export const ItemAutoCompleteDropDown = ({dataSource, chooseItem, setDisable }) => {
    const dropdownOptions = {
        type: "text",
        placeholder: t('placeholder-item-search'),
        searchFieds: ['code', 'eng_name', 'mm_name', 'location', 'model']
    }

    return(
        <Dropdown>
            <Dropdown.Menu 
                show={true}
                as={CustomMenu} 
                options={dropdownOptions} 
                dataSource={dataSource} 
                chooseItem={(e) => chooseItem(e)}
                setDisable={e => setDisable(e)}
            />
        </Dropdown>
    );
}