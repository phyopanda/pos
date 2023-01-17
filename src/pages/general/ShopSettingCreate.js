import React, { useState } from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { t, zawgyi } from '../../utilities/translation.utility';
import { messageBoxType } from '../../utilities/native.utility';
import { createShop } from '../../services/shop.service';

export const ShopSettingCreate = ({retrive}) => {
	const state = useSelector(state => state);
	const { lang } = state;

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);

	const create = async () => {
		const {nativeApi} = window;
		if (name === '' || phone === '' || address === '') {
			nativeApi.messageBox.open({
				title: t('create-shop-information'),
				message: t('all-fields-are-requried'),
				type: messageBoxType.info
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

		const response = await createShop(requestBody);

		if (response && response.success === false) {
			nativeApi.messageBox.open({
				title: t('create-shop-information'),
				message: t('response-error'),
				type: messageBoxType.info
			});
			setLoading(false);
			return;
		}

		nativeApi.messageBox.open({
			title: t('create-shop-information'),
			message: t('success-shop-info'),
			type: messageBoxType.info
		});

		setLoading(false);
		retrive(response);
	};

	return (
		<Card>
			<Card.Header>
				<Card.Title> {t('create-shop-information')} </Card.Title>
			</Card.Header>

			<Card.Body>
				<InputGroup className="mb-3">
					<FormControl
						className={`${zawgyi(lang)}`}
						type="text"
						value={name}
						placeholder={t('name')}
						onChange={e => setName(e.target.value)}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<FormControl
						className={`${zawgyi(lang)}`}
						type="text"
						value={description}
						placeholder={t('description')}
						onChange={e => setDescription(e.target.value)}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<FormControl
						className={`${zawgyi(lang)}`}
						as="textarea"
						value={address}
						placeholder={t('address')}
						onChange={e => setAddress(e.target.value)}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<FormControl
						className={`me-3 ${zawgyi(lang)}`}
						type="phone"
						value={phone}
						placeholder={t('phone')}
						onChange={e => setPhone(e.target.value)}
					/>

					<FormControl
						type="email"
						className={`${zawgyi(lang)}`}
						value={email}
						placeholder={t('email')}
						onChange={e => setEmail(e.target.value)}
					/>
				</InputGroup>

				<div className="d-flex flex-row justify-content-start align-items-center">
					<Button className={`${zawgyi(lang)}`} onClick={() => create()} disabled={loading}> {t('confirm')} </Button>
				</div>
			</Card.Body>
		</Card>
	);
};
