import { combineReducers } from "redux";
import { accountReducer } from "./account.reducer";
import { authReducer } from "./auth.reducer";
import { charasterReducer } from "./charaster.reducer";
import { configReducer } from "./config.reducer";
import { devcieReducer } from "./device.reducer";
import { langReducer } from "./lang.reducer";
import { numberFormatReducer } from "./numberFormat.reducer";
import { openDelReducer } from "./openDelModal.reducer";
import { saleReducer } from "./sale.reducer";
import { sellPriceReducer } from "./sellprice.reducer";
import { toastReducer } from "./toast.reducer";
import { invoiceReducer } from "./invoice.reducer";
import { taxReducer } from "./tax.reducer";
import { printReducer } from "./print.reducer";
import { invoiceSettingReducer } from "./invoiceSetting.reducer";

export default combineReducers({
    auth: authReducer,
    lang: langReducer,
    account: accountReducer,
    device: devcieReducer,
    numberFormat: numberFormatReducer,
    toast: toastReducer,
    char: charasterReducer,
    delModal: openDelReducer,
    cartReducer: saleReducer,
    printData : printReducer ,
    tax: taxReducer,
    config: configReducer,
    sellPrice: sellPriceReducer,
    invoice: invoiceReducer,
    invoiceSetting : invoiceSettingReducer,
});
