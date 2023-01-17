import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { t, zawgyi } from "../../utilities/translation.utility";
import { SortByAlphabet, SortByNumber } from "../../utilities/tableSort.utility";
import { BsTrash } from "react-icons/bs";
import { setOpenDelModal } from "../../redux/actions/openDelModal.action";

const OverlayToolTip = (row, filedName) => {
    return(
        <OverlayTrigger placement="top" overlay={<Tooltip> {row[filedName]} </Tooltip>}>
            <span> {row[filedName]} </span>
        </OverlayTrigger>
    )
}

export const CategoryColumns = () => {
    const state = useSelector(state => state);
    const { lang } = state;

    const dispatch = useDispatch();

    const delCategory = async (id) => {

        dispatch(setOpenDelModal({
            title: t('delete-title'),
            message: t('delete-message'),
            open: true,
            type: 'category',
            id: id
        }))
        
        return;
    }

    const columns = [
        {   
            name: <span> # </span>,
            selector: (row, index) => index + 1,
            width: '70px'
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {t('name')} </span>,
            selector: row => OverlayToolTip(row, 'name'),
            sortable: true,
            sortFunction: (rowA, rowB) => SortByAlphabet(rowA, rowB, 'name')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {t('description')} </span>,
            selector: row => OverlayToolTip(row, 'description')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {t('total-item-count')} </span>,
            selector: row => row.total_item,
            sortable: true,
            sortFunction: (rowA, rowB) => SortByNumber(rowA, rowB,  'total_item')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {t('option')} </span>,
            selector: row => {
                if(row.total_item === 0) {
                    return(
                        <BsTrash 
                            className="btn-icon" 
                            color={"red"} 
                            size={20} 
                            onClick={() => delCategory(row.id)}
                        />
                    )
                }
            }
        },
    ];

    return columns;
}
