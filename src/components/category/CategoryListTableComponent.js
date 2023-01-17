import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { TableLoadingComponent } from "../table/tableLoading";
import { t, zawgyi } from "../../utilities/translation.utility";
import { paginationComponentOptions, paginationPerPage, paginationRowsPerPageOptions } from "../../utilities/tablePagination.utility";
import { CategorySearchComponent} from "./CategorySearchComponent";
import { CategoryRowExpandComponent } from "./CategoryRowExpandComponent";
import { CategoryColumns } from "./category.columns";
import { useSelector } from "react-redux";
import CategoryTableHeaderComponent from "./CategoryTableHeaderComponent";

export const CategoryListTableComponent = ({ dataSource ,reload }) => {

    const state = useSelector(state => state);
    const { lang } = state;

    const [tableLoading, setTableLoading] = useState(true);
    const [categories, setCategory] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        if(dataSource){
            setCategory(dataSource);
            setTableLoading(false);
        }
    },[dataSource]); 


    return(
        <Card className="mt-3">
            <Card.Header>
                <div className="d-md-flex flex-md-row justify-content-between align-items-center">
                    <Card.Title>
                        <span className={`title-default ${zawgyi(lang)}`}> {t('category')} </span>
                    </Card.Title>

                    <div className="col-md-2">
                        <CategorySearchComponent 
                            dataSource={dataSource} 
                            retrive={e => setCategory(e)}  
                        />
                    </div>
                </div>
            </Card.Header>

            <Card.Body>
				<DataTable
                    data={categories}
                    columns={CategoryColumns()}
                    responsive={true}
                    dense
                    highlightOnHover
                    pointerOnHover
                    fixedHeader={true}
                    fixedHeaderScrollHeight='400px'
                    subHeader={true}
                    subHeaderComponent={
                        <CategoryTableHeaderComponent
                            dataSoucre={selectedRows}
                        />
                    }
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
					paginationPerPage={paginationPerPage}
					paginationRowsPerPageOptions={paginationRowsPerPageOptions}
                    progressPending={tableLoading}
                    progressComponent={
                        <TableLoadingComponent />
                    }
                    expandableRows={true}
                    expandOnRowDoubleClicked={true}
                    expandableRowsComponent={CategoryRowExpandComponent}
                    expandableRowsComponentProps={{'refresh': (e) => {
                        reload(e)
                    }}}
                    onSelectedRowsChange={e => setSelectedRows(e.selectedRows)}
                    selectableRows={true}
                    selectableRowsHighlight={true}
                />
            </Card.Body>
        </Card>
    )
}