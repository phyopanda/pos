import React, {useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { ItemColumns } from './Item.columns';
import { useHistory } from 'react-router-dom';
import { ChangeNumberFormatBtn } from '../general/changeNumberFormatBtn';
import { paginationComponentOptions, paginationPerPage, paginationRowsPerPageOptions } from '../../utilities/tablePagination.utility';
import { TableLoadingComponent } from '../table/tableLoading';
import { ItemRowExpandComponent } from './ItemRowExpandComponent';
import { ItemConditionalRowStyles } from '../../utilities/tableConditionalRowStylesutility';
import { ItemTableHeaderComponent } from './ItemTableHeaderComponent';
import { ItemSearchComponent } from './ItemSearchComponent';
import { ItemPercentageChangeComponent } from './ItemPercentageChangeComponent';

export const ItemListTableComponent = ({ dataSource, reload }) => {
	const [tableLoading, setTableLoading] = useState(true);
	const [itemList, setItemList] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	const history = useHistory();

	const [redirState, setRedirState] = useState(false);
	const [shortName, setShortName] = useState('');
	const redirecting = redirState ? (history.push(`/item/${shortName}`)) : '';

	useEffect(() => {
		if (dataSource) {
			setItemList(dataSource);
			setTableLoading(false);
		}
	},[dataSource]);

	return (
		<Card className="mt-1">
			<Card.Header>
				<div className="d-md-flex flex-md-row justify-content-between align-items-center">
					<div className='d-md-flex flex-md-row justify-content-start aligen-items-center'>
						<ItemSearchComponent 
							dataSource={dataSource} 
							retrive={e => setItemList(e)}
						/>
						<ItemPercentageChangeComponent reload={e => reload(e)} />
					</div>
					
					<ChangeNumberFormatBtn />
				</div>
			</Card.Header>

			<Card.Body>
				<DataTable
					responsive={true}
					fixedHeader={true}
					fixedHeaderScrollHeight='400px'
					pagination
					columns={ItemColumns()}
					subHeader={true}
					subHeaderComponent={
						<ItemTableHeaderComponent 
							dataSource={selectedRows}
						/>
					}
					data={itemList}
					paginationComponentOptions={paginationComponentOptions}
					progressPending={tableLoading}
					progressComponent={<TableLoadingComponent />}
					dense
					highlightOnHover
					pointerOnHover
					onRowClicked={rowData => {
						setRedirState(true);
						setShortName(rowData.id);
					}}
					// selectableRows={true}
					// selectableRowsHighlight={true}
					expandableRows={true}
					// expandOnRowDoubleClicked={true}
					onSelectedRowsChange={e => setSelectedRows(e.selectedRows)}
					paginationPerPage={paginationPerPage}
					paginationRowsPerPageOptions={paginationRowsPerPageOptions}
					conditionalRowStyles={ItemConditionalRowStyles}
					expandableRowsComponent={ItemRowExpandComponent}
					expandableRowsComponentProps={{'refresh': (e) => {
						reload(e)
					}}}
				/>
				{redirecting} 
			</Card.Body>
		</Card>
	);
};
