import React, {useEffect, useState} from 'react';
import {Button, Card, FormControl, InputGroup} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {t} from 'i18next';
import { messageBoxType } from '../../utilities/native.utility';
import { updateShop } from '../../services/shop.service';


export const ShopSettingEdit = ({dataSource, retrive}) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);
	const [messageBoxTitle, setMessageBoxTitle] = useState('Update Shop');

	const checkphone = /^(\+?(95)|[09])\d{10}/g;
	const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const dispatch = useDispatch();
	const {nativeApi} = window;

	useEffect(
		() => {
			if (dataSource) {
				setName(dataSource.name);
				setDescription(dataSource.description);
				setPhone(dataSource.phone);
				setEmail(dataSource.email);
				setAddress(dataSource.address);
			}
		},
		[dataSource]
	);

	const update = async () => {
		if (name === '' || description === '' || phone === '' || email === '' || address === '') {
			nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: 'All fileds are required',
				type: messageBoxType.error
			});
			return;
		}

		// if(!checkphone.test(phone)) {
		//     return dispatch(setOpenToastAction('Shop Create', 'Invalid phone numnber','danger'));
		// }

		if (!pattern.test(email)) {
			nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: 'Invalid email address',
				type: messageBoxType.error
			});
			return;
		}

		const requestBody = {
			name: name,
			description: description,
			phone: phone,
			address: address,
			email: email
		};

		setLoading(true);

		const response = await updateShop(requestBody);

		if (response && response.success === false) {
			setLoading(false);
			nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: response.message,
				type: messageBoxType.error
			});
			return;
		}

		if (response) {
			nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: 'Shop info is updated',
				type: messageBoxType.info
			});
			setLoading(false);
			retrive(response);
			return;
		}
	};

	return (
		<Card>
			<Card.Header>
				<Card.Title> {t('update-shop-information')} </Card.Title>
			</Card.Header>

			<Card.Body>
				<InputGroup className="mb-3">
					<FormControl
						type="text"
						value={name}
						placeholder={t('name')}
						onChange={e => setName(e.target.value)}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<FormControl
						type="text"
						value={description}
						placeholder={t('description')}
						onChange={e => setDescription(e.target.value)}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<FormControl
						as="textarea"
						value={address}
						placeholder={t('address')}
						onChange={e => setAddress(e.target.value)}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<FormControl
						className="me-3"
						type="text"
						value={phone}
						placeholder={t('phone')}
						onChange={e => setPhone(e.target.value)}
					/>

					<FormControl
						type="email"
						value={email}
						placeholder={t('email')}
						onChange={e => setEmail(e.target.value)}
					/>
				</InputGroup>

				<div className="d-flex flex-row justify-content-start align-items-center">
					<Button onClick={() => update()} disabled={loading}>
						{' '}
						{t('confirm')}{' '}
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
};
