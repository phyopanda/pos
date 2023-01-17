/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()<>,.?/[]{}-=_+|/0123456789';

const getRandomInteger = () => {
	const max = characters.length - 1;
	return Math.floor(Math.random() * (max - 0 + 1) + 0);
}

export const generator = (passwordLength) => {
	let password = '';

	for(let x=0; x < passwordLength; x++) {
		const charLength = getRandomInteger();
		password += characters[charLength];
	}

	return password;
}