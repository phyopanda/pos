
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { TableHeaderComponent } from '../table/tableHeader';
import { TableLoadingComponent } from '../table/tableLoading';
import { accountColumns } from '../columns/account.columns';
import { paginationComponentOptions } from '../table/paginationOptions';
import { t } from 'i18next';

const searchColumns = [
    t('name'), t('email'), t('phone')
];

export const AccountList = ({ dataSource, reload, selectedEdit }) => {

    const [ tableLoading, setTableLoading ] = useState(true);
    const [ itemList, setItemList] = useState([]);
    const [ selectedRows, setSelectedRows] = useState([]);

    const getFilterResult = (e) => {
        setItemList(e);
    }

    useEffect(() => {
        if(dataSource) {
            setItemList(dataSource);
            setTableLoading(false);
        }
    }, [dataSource]);

    return(
        <div className='d-md-flex flex-md-row'>
            <div className='col-md-12'>
                <Card>
                    <Card.Header>
                        <Card.Title className='p-2'>
                            <span> {t('account')} </span>
                        </Card.Title>
                    </Card.Header>

                    <Card.Body>
                        <DataTable
                            subHeader={true}
                            subHeaderComponent={
                                <TableHeaderComponent 
                                    type='auth'
                                    dataSource={dataSource} 
                                    searchColumns={searchColumns} 
                                    placeholder={t('search')}
                                    filterResult={e => getFilterResult(e)}
                                    selectedRows={selectedRows}
                                    reload={(e) => reload(e)}
                                />
                            }
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight="400px"
                            columns={accountColumns((edit) => {
                                selectedEdit(edit);
                            })}
                            data={itemList}
                            paginationComponentOptions={paginationComponentOptions}
                            progressPending={tableLoading}
                            progressComponent={<TableLoadingComponent />}
                            dense
                            highlightOnHover
                            pointerOnHover
                        />
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}