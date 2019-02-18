import { combineReducers } from "redux";
import phones from './phones';
import cart from './cart';

export default combineReducers({
    phones,
    cart
});