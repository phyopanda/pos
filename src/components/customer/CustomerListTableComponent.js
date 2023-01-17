import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { customerColumns } from '../columns/customer.columns';
import { paginationComponentOptions } from '../table/paginationOptions';
import CustomerTableHeaderComponent from '../table/customerTableHeader';
import { TableLoadingComponent } from '../table/tableLoading';
import {t} from 'i18next';
import {CustomerRowExpandComponent} from './utilities/CustomerRowExpandComponent';
import SearchCustomer from './utilities/SearchCustomer';

const searchColumns = [
    t('name'), t('email'), t('phone')
];

export const CustomerListTableComponent = ({ props, dataSource, reload, retrive }) => {

    const [tableLoading, setTableLoading] = useState(true);
    const [customerList, setCustomerList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const getFilterResult = (e) => {
        setCustomerList(e);
    }

    const getCustomerList = () => {
        let customerData = dataSource.filter(e => e.customer_name !== null);
        return customerData;
    }

    const boughtInvoicesHandler = (e) => {
        setSelectedRows(e);
        retrive(e);
    }

    const handleSearch = (e) => {
        setCustomerList(e);
    }

    useEffect(() => {
        if (dataSource) {
            let customerList = getCustomerList();
            setCustomerList(customerList);
            setTableLoading(false);
        }
    }, [dataSource]);

    return (
        <>
            <Card className='mt-3'>
                <Card.Header>
                    <div className='d-md-flex flex-md-row justify-content-between'>
                        <span className='title'> {t('customer')}</span>
                        <div className='col-md-3'>
                            <SearchCustomer data={dataSource} searchResult={(e) => handleSearch(e)}/>
                        </div>
                    </div>
                </Card.Header>

                <Card.Body>
                    <DataTable
                        subHeader={true}
                        subHeaderComponent={
                            <CustomerTableHeaderComponent
                                type={'CustomerLists'}
                                props={props}
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
                        fixedHeaderScrollHeight='400px'
                        columns={customerColumns(props)}
                        data={customerList}
                        paginationComponentOptions={paginationComponentOptions}
                        progressPending={tableLoading}
                        progressComponent={<TableLoadingComponent />}
                        dense
                        highlightOnHover
                        pointerOnHover
                        selectableRows={true}
                        selectableRowsHighlight={true}
                        onSelectedRowsChange={e => boughtInvoicesHandler(e.selectedRows)}
                        paginationPerPage={50}
                        expandableRows={true}
                        expandOnRowClicked={true}
                        expandableRowsComponent={CustomerRowExpandComponent}
                        expandableRowsComponentProps={{'refresh' : e => reload(e)}}
                        paginationRowsPerPageOptions={[50, 100, 150, 200, 500]}
                    />
                </Card.Body>
            </Card>
        </>
    )
}
