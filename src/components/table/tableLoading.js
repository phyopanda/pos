import React, { useEffect, useState } from "react";
import { t } from "../../utilities/translation.utility"

export const TableLoadingComponent = ({ dataSource }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        if(dataSource) {
            setData(dataSource);
        }
    }, [dataSource])

    return(
        <div className='data-table-loading-wrapper'>
            { data && data.length === 0  ? (<span> {t('table-no-data')}</span>) : (<span> {t('table-loading-message')}</span>)}
        </div>
    )
}