import { combineReducers } from 'redux';
import userReducer from './redux/user/reducers';
import statusReducer from './redux/status/reducers';

export default combineReducers({
	user: userReducer,
	status: statusReducer
});