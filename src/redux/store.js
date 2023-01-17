/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers';
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];
export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
);
