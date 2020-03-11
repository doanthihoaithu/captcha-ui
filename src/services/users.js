// @flow
import { requestServices } from 'services';
import * as constants from 'constants/index'

// const fetchUsers = () => requestServices.customAxios.get('/').then(res => res.data);

const signUserIn = (data) => requestServices.customAxios.post(
    constants.user_authenticate_address,
    data,
    {
        header: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
        }
    }
)

const signUserOut = (accessToken) => requestServices.customAxios.post(
    constants.user_sign_out_address,
    {},
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }
)

const registerNewUser = (data) => requestServices.customAxios.post(
    constants.user_sign_up_address,
    data,
    {
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
        }
    }
)

const resetPassword = (data) => requestServices.customAxios.post(
    constants.user_forget_password_address,
    data,
    {
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
        }
    }
)

const changePassword = (data, accessToken) => requestServices.customAxios.post(
    constants.user_change_password_address,
    data,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            // 'Access-Control-Allow-Origin': '*'
        }
    }
)

const updateAvatar = (username, data, accessToken) => requestServices.customAxios.post(
    constants.user_update_avatar_address + username,
    data,
    {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`
        }
    }
)

const getAvatar = (username) => requestServices.customAxios.get(
    constants.user_get_avatar_address + username,
)

export default {
    signUserIn,
    signUserOut,
    registerNewUser,
    resetPassword,
    changePassword,
    updateAvatar,
    getAvatar,
};
