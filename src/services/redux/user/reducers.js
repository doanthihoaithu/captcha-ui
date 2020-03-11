import Cookies from 'universal-cookie'
import { LOG_IN, LOG_OUT, UPDATE_AVATAR } from './actionTypes';

const cookies = new Cookies();

const initialState = {
	isAuthenticated: !!cookies.get("leave")
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN:
			return {
				...state,
				isAuthenticated: true,
				username: action.username,
				accessToken: action.access_token,
				refreshToken: action.refresh_token,
			};
		case LOG_OUT:
			cookies.remove('leave');
			return {
				...state,
				isAuthenticated: false,
				username: undefined,
				accessToken: undefined,
				refreshToken: undefined,
			};
		default:
			return state;
	}
}