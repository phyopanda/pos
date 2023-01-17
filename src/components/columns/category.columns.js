import React from 'react';
import { BsArrowUpRightSquare } from "react-icons/bs";
import { useHistory } from 'react-router-dom';
import { t } from 'i18next';

export const categoryColumns = () => {
    const history = useHistory();

    return [
        {
            name: <span className='datatable-header'>#</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className="datatable-header"> {t('name')} </span>,
            selector: row => row.name,
            sortable: true
        },
        {
            name: <span className="datatable-header"> {t('description')} </span>,
            selector: row => row.description,
        }
        // {
        //     name: <span className="datatable-header"> {t('option')} </span>,
        //     selector: (row) => {
        //         return(
        //             <BsArrowUpRightSquare 
        //                 size={20} 
        //                 className="icon-btn-outline"
        //                 onClick={() => history.push(`/category/${row.id}`)}
        //             />
        //        )
        //     },
        //     sortable: true,
        // }
    ]
}