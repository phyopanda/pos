import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { messageBoxType } from '../../utilities/native.utility';
import { t, zawgyi } from '../../utilities/translation.utility';
import { ItemAutoCompleteDropDown } from './utilities/ItemAutoCompleteDropDown';

export const SaleVoucherInputComponent = ({ dataSource, retrive, selectedItem }) => {
	const state = useSelector(state => state);

	const { lang } = state;
	const { nativeApi } = window;

	const [qty, setQty] = useState('');
	const [items, setItems] = useState([]);
	const [item, setItem] = useState(null);
	const [isDisable, setDisable] = useState(true);

	const messageBoxTitle = t('title-request-item-qty');

	const addItem = e => {
		if (!Number(qty)) {
			setQty('');
			return nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: t('invalid-qty'),
				type: messageBoxType.info
			});
		}

		if (Number(item.totalQty) < Number(e) || Number(e) <= 0) {
			return nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: t('invalid-qty'),
				type: messageBoxType.info
			});
		}

		item.requestQty = Number(e);
		item.totalAmount = Number(e) * Number(item.sell_price);
		item.totalOriginAmount = Number(e) * Number(item.price);

		const getCurrentInvoice = localStorage.getItem('CURRENT_INVOICE')
			? JSON.parse(localStorage.getItem('CURRENT_INVOICE'))
			: [];



		const checkItem = getCurrentInvoice.filter(value => value.code === item.code);

		if (checkItem.length > 0) {
			const newItems = getCurrentInvoice.filter(value => value.code !== item.code);
			newItems.push(item);
			localStorage.setItem('CURRENT_INVOICE', JSON.stringify(newItems));
			retrive(item);
			selectedItem(null);
			return;
		}

		getCurrentInvoice.push(item);
		localStorage.setItem('CURRENT_INVOICE', JSON.stringify(getCurrentInvoice));

		retrive(item);
		selectedItem(null);
	};

	const disableHandler = item => {
		if (item.qty === 0) {
			return setDisable(true);
		}
		return setDisable(false);
	};

	useEffect(
		() => {
			if (dataSource) {
				setItems(dataSource);
			}

			if (item !== null) {
				selectedItem(item);
			}
		},
		[dataSource, item]
	);

	return (
		<div className="d-md-flex flex-md-row align-items-start justify-content-end">
			<ItemAutoCompleteDropDown
				dataSource={items}
				chooseItem={e => {
					setItem({
						id: e.id,
						name: e.eng_name,
						model: e.model,
						code: e.code,
						price: parseInt(e.price),
						totalQty: Number(e.qty),
						percentage: Number(e.percentage),
						sell_price: parseInt(Number(e.price) * Number(e.percentage) / 100 + Number(e.price)),
						location: e.location,
						category: e.category
					});

					disableHandler(e);
				}}
				setDisable={e => setDisable(e)}
			/>

			<InputGroup>
				<FormControl
					className={`w-120 ${zawgyi(lang)}`}
					type="text"
					placeholder={t('quantity')}
					value={qty}
					onChange={e => {
						if (!Number(e.target.value)) {
							e.preventDefault;
							return setQty('');
						}

						return setQty(e.target.value);
					}}
					onKeyPress={e => {
						if (e.code === 'Enter') {
							addItem(e.target.value);
						}
					}}
					disabled={isDisable}
				/>
			</InputGroup>
		</div>
	);
};
