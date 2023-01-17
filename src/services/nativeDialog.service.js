/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import translate from '../assets/i18n/mm.json';

let warningDialogOptions = {
    type: 'warning',
    buttons: [translate.dialogBtn.ok],
    defaultId: 0
}

export const showWarningDialog = (title, message) => {
    warningDialogOptions.title = title;
    warningDialogOptions.message = message;

    return electron.dialogApi.sendDialog(warningDialogOptions);
}