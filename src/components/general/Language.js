import React, {useEffect, useState} from 'react';
import {FormSelect, InputGroup} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {t, zawgyi} from '../../utilities/translation.utility';
import {setLangAction} from '../../redux/actions/lang.action';
import '../../assets/css/components/language.css';

const languages = [
	{
		label: 'unicode',
		value: 'unicode'
	},
	// {
	//     label: 'zawgyi',
	//     value: 'zawgyi'
	// },
	{
		label: 'english',
		value: 'en'
	}
];

export const Language = () => {
	const state = useSelector(state => state);
	const history = useHistory();

	const {lang} = state;
	const [lng, setLang] = useState(lang);

	const dispatch = useDispatch();

	const changeLang = selectedValue => {
		dispatch(setLangAction(selectedValue));
		setLang(selectedValue);

		window.nativeApi.app.navigateTo(url => {
			history.push(url);
		});
	};

	return (
		<div className="lang-wrapper">
			<label className="label-default"> {t('change-language')} </label>

			<InputGroup className="lang-input-group">
				<FormSelect className={zawgyi(lng)} onChange={e => changeLang(e.target.value)} defaultValue={lng}>
					{languages.map((value, index) => {
						return (
							<option className={zawgyi(lng)} key={`lang_id_${index}`} value={value.value}>
								{t(value.label)}
							</option>
						);
					})}
				</FormSelect>
			</InputGroup>
		</div>
	);
};
