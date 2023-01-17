import React, { useState } from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveCategory } from '../../services/category.service';
import { t, zawgyi } from '../../utilities/translation.utility';
import { messageBoxType } from '../../utilities/native.utility';

export const CreateCategoryComponent = ({ reload }) => {

	const state = useSelector(state => state);
	const { lang } = state;

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState('');
	const messageBoxTitle = t('title-create-category');

	const reset = () => {
		setName('');
		setDescription('');
		setLoading(false);
		reload(true);
	};

	const createCategory = async () => {
		const {nativeApi} = window;

		if (name === '') {
			nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: t('category-name-is-required'),
				type: messageBoxType.error
			});
			return;
		}

		const requestBody = {
			name: name,
			description: description
		};

		setLoading(true);

		const response = await saveCategory(requestBody);

		if (response && response.success === false) {
			nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: response.message,
				type: messageBoxType.error
			});
			setLoading(false);
			return;
		}

		nativeApi.notification.show({ title: messageBoxTitle, body: t('success-create-category')});
		
		setLoading(false);
		reset();
		return;
	};

	return (
		<Card className="mt-3">
			<Card.Header>
				<Card.Title>
					<span className={`title-default ${zawgyi(lang)}`}> {t('create-category')} </span>
				</Card.Title>
			</Card.Header>

			<Card.Body>
				<InputGroup className="mb-3">
					<FormControl
						type="text"
						placeholder={t('name')}
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<FormControl
						type="text"
						placeholder={t('description')}
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
				</InputGroup>

				<Button className="btn btn-samll" disabled={loading} onClick={() => createCategory()}>
					{t('btn-save')}
				</Button>
			</Card.Body>
		</Card>
	);
};
