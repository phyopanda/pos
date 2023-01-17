import React, {useState, useEffect} from 'react';
import {Button, Card, FormControl, FormLabel, InputGroup} from 'react-bootstrap';
import {BsArrowCounterclockwise} from 'react-icons/bs';
import {useDispatch} from 'react-redux';
import {setOpenToastAction} from '../../redux/actions/toast.action';
import {updateItem} from '../../services/item.service';
import {t} from 'i18next';
import {messageBoxType} from '../../utilities/native.utility';

export const EditItemComponent = ({dataSource, props, item, reload}) => {
	const {id} = props.match.params;

	const dispatch = useDispatch();

	const [editItem, setEditItem] = useState(null);
	const [loading, setLoading] = useState(false);
	const [code, setCode] = useState('');
	const [eng_name, setEnName] = useState('');
	const [mm_name, setMMName] = useState('');
	const [model, setModel] = useState('');
	const [qty, setQty] = useState('');
	const [price, setPrice] = useState('');
	const [itemLocation, setItemLocation] = useState('');
	const [status, setStatus] = useState(0);
	const [messageBoxTitle, setMessageBoxTitle] = useState('Update Item');

	const [tableLoading, setTableLoading] = useState(true);
	const [itemList, setItemList] = useState([]);

	

	const setData = () => {
		setEditItem(item);
		setCode(item.code);
		setEnName(item.eng_name);
		setMMName(item.mm_name);
		setModel(item.model);
		setQty(item.qty);
		setPrice(item.price);
		setItemLocation(item.location);
		setStatus(item.active ? 1 : 0);
	};

	const update = async () => {
		if (!Number(qty)) {
			window.nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: 'Invalid Qty',
				type: messageBoxType.error
			});
			return;
		}

		const requestBody = {
			code: code,
			eng_name: eng_name,
			mm_name: mm_name,
			model: model,
			qty: qty,
			price: price,
			location: itemLocation,
			active: status
		};

		const fileds = Object.keys(requestBody);

		fileds.map(field => {
			if (requestBody[field] === editItem[field]) {
				delete requestBody[field];
			}
		});

		if (Object.keys(requestBody).length > 0) {
			setLoading(true);

			const response = await updateItem(id, requestBody);
			

			if (response && response.success === false) {
				window.nativeApi.messageBox.open({
					title: messageBoxTitle,
					message: response.message,
					type: messageBoxType.error
				});
				setLoading(false);
				return;
			}

			window.nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: `${t('item-is-updated')}`,
				type: messageBoxType.info
			});
			setLoading(false);
			reload();
		}

		return;
	};

	useState(
		() => {
			if (item) {
				setData();
			}
		},
		[item]
	);
	
	return (
		<Card>
			<Card.Header>
				<Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center">
					<span className="title"> {t('update-item')} </span>
					<BsArrowCounterclockwise size={20} className="btn-icon" onClick={() => setData()} />
				</Card.Title>
			</Card.Header>

			{editItem && (
				<Card.Body>
					<FormLabel> {t('materail-code')} </FormLabel>
					<InputGroup className="mb-3">
						<FormControl
							type="text"
							placeholder={t('materail-code')}
							value={code || ''}
							onChange={e => setCode(e.target.value)}
						/>
					</InputGroup>

					<FormLabel> {t('name')} </FormLabel>
					<InputGroup className="mb-3">
						<FormControl
							type="text"
							placeholder={t('name')}
							value={eng_name || ''}
							onChange={e => setEnName(e.target.value)}
						/>
					</InputGroup>

					<FormLabel> {t('myanmar-name')} </FormLabel>
					<InputGroup className="mb-3">
						<FormControl
							type="text"
							placeholder={t('myanmar-name')}
							value={mm_name || ''}
							onChange={e => setMMName(e.target.value)}
						/>
					</InputGroup>

					<FormLabel>{t('model')} </FormLabel>
					<InputGroup className="mb-3">
						<FormControl
							type="text"
							placeholder={t('model')}
							value={model || ''}
							onChange={e => setModel(e.target.value)}
						/>
					</InputGroup>

					<FormLabel> {t('quantity')} </FormLabel>
					<InputGroup className="mb-3">
						<FormControl
							type="text"
							placeholder={t('quantity')}
							value={qty || 0}
							onChange={e => setQty(e.target.value)}
						/>
					</InputGroup>

					<FormLabel> {t('price')} </FormLabel>
					<InputGroup className="mb-3">
						<FormControl
							type="text"
							placeholder={t('price')}
							value={price || ''}
							onChange={e => setPrice(e.target.value)}
						/>
					</InputGroup>

					<FormLabel>{t('location')} </FormLabel>
					<InputGroup className="mb-3">
						<FormControl
							type="text"
							placeholder={t('location')}
							value={itemLocation || ''}
							onChange={e => setItemLocation(e.target.value)}
						/>
					</InputGroup>
					<FormLabel>{t('status')} </FormLabel>
					<InputGroup className="mb-3">
                        <FormControl
                            
                            as="select"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value={1}> Publish </option>
                            <option value={0}> Unpublish </option>
                        </FormControl>
                    </InputGroup>
				</Card.Body>
			)}

			{editItem && (
				<Card.Footer>
					<Button className="btn-small w-full" disabled={loading} onClick={() => update()}>
						{' '}
						{t('confirm')}{' '}
					</Button>
				</Card.Footer>
			)}
		</Card>
	);
};
