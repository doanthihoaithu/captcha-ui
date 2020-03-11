import { LOG_IN, LOG_OUT, UPDATE_AVATAR } from './actionTypes';

export const logIn = (data) => ({
	type: LOG_IN,
	username: data.username,
	access_token: data.access_token,
	refresh_token: data.refresh_token
});

export const logOut = () => ({
	type: LOG_OUT,
	username: undefined,
	access_token: undefined,
	refresh_token: undefined,
});