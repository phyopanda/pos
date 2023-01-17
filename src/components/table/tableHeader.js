import React, {useEffect, useState} from 'react';
import {Button, FormControl, InputGroup} from 'react-bootstrap';
import {autocomplete, searchAll} from '../../utilities/table.utility';
import {BsTrash} from 'react-icons/bs';
import {useDispatch} from 'react-redux';
import {setOpenDelModal} from '../../redux/actions/openDelModal.action';
import {setOpenToastAction} from '../../redux/actions/toast.action';
import {updatePercentage} from '../../services/item.service';

export const TableHeaderComponent = ({
	dataSource,
	searchColumns,
	placeholder,
	filterResult,
	selectedRows,
	reload,
	type
}) => {
	const dispatch = useDispatch();

	const [text, setText] = useState('');
	const [filterType, setFilterType] = useState(searchColumns[0]);
	const [selectedList, setSelectedList] = useState([]);
	const [calPercentage, setCalPercentage] = useState('');
	const [items, setItems] = useState([]);

	const autoSearch = (e) => {
		setText(e);

		if(e === '') {
			filterResult(items);
			return;
		}

		const suggestionResultForCode = items.filter((item) => item.code.toLowerCase().includes(text.toLowerCase()));
		const suggestionResultForName = items.filter((item) => item.eng_name.toLowerCase().includes(text.toLowerCase()));
		const resultConnect = suggestionResultForCode.concat(suggestionResultForName);
		filterResult(resultConnect);
	};

	const reset = () => {
		setFilterType(searchColumns[0]);
		setText('');
		filterResult(dataSource);
	};

	const deleteSelectedRows = () => {
		dispatch(
			setOpenDelModal({
				title: 'Delete Record',
				message: 'Are you sure to delete record',
				type: type,
				multiple: true,
				open: true,
				data: selectedList
			})
		);
	};

	const changePercentage = async amount => {
		if (amount === '' || Number(amount) === 0) {
			dispatch(setOpenToastAction('Update percentage ', 'Invalid percentage', 'danger'));
			return;
		}

		let requestBody = {
			type: Number(amount) < 0 ? 'decrement' : 'increment',
			amount: Math.abs(amount)
		};

		const response = await updatePercentage(requestBody);
		if (response && response.success === false) {
			dispatch(setOpenToastAction('Update percentage', response.message, 'danger'));
			return;
		}

		setCalPercentage('');
		reload(true);
		return;
	};

	useEffect(() => {
		if (selectedRows) {
			setSelectedList(selectedRows);
			}
		},[selectedRows]);

	useEffect(() => {
		if(dataSource) {
			setItems(dataSource);
		}
	}, [dataSource]);

	return (
		<div className="table-header mb-2">
			<div className="table-header-left">
				{selectedRows.length > 0 && (
					<div className="d-md-flex flex-md-row justifiy-content-start align-items-center">
						<Button className="btn-small ms-3" onClick={() => deleteSelectedRows()}>
							<BsTrash size={20} />
							<span> Delete All </span>
						</Button>
					</div>
				)}
			</div>

			<InputGroup className="table-header-right">
				{type === 'Items' && (
					<FormControl
						className="input-small"
						type="text"
						placeholder="Change Items %"
						value={calPercentage}
						onChange={e => {
							setCalPercentage(e.target.value);
						}}
						onKeyPress={e => {
							if (e.code === 'Enter') {
								if (!Number(calPercentage)) {
									dispatch(setOpenToastAction('Percentage', 'Invalid Input', 'danger'));
									return;
								}
								changePercentage(e.target.value);
							}
						}}
					/>
				)}

				<FormControl
					className="input-small"
					type="text"
					placeholder={placeholder}
					value={text}
					onChange={e => autoSearch(e.target.value)}
				/>

				{/* <FormControl
                    className="select-input-group"
                    as={'select'}
                    value={filterType}
                    onChange={(e) => {
                        setFilterType(e.target.value);
                        setText('');
                        filterResult(dataSource)
                    }}
                >
                    {searchColumns.map((filter, index) => {
                        return(
                            <option key={`filter_column_id_${index}`}> {filter} </option>
                        )
                    })}
                </FormControl> */}

				{/* <Button className="btn-small" onClick={() => reset()}>
					{' '}
					Reset{' '}
				</Button> */}
			</InputGroup>
		</div>
	);
};
