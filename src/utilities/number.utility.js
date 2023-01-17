const numeral = require('numeral');

export const changeNumberFormat = (value, numberFormat, char) => {

    if(numberFormat === 'number') {
        return numeral(value).format('0,0');
    }

    let charValue = '';

    if(char) {
        for(let x=0; x<value.length; x++) {
            const charFilter = char.filter((charValue) => {
                if(Number(charValue.set_number) === Number(value.charAt(x))) {
                    return charValue.set_char;
                }
            });

            if(charFilter.length > 0) {
                charValue += charFilter[0].set_char;
            }

            if(charFilter.length === 0) {
                charValue += '.';
            }
        }
    }

    return charValue;
}