export const API_address = `${process.env.REACT_APP_BACKEND_HOST || 'http://localhost:5000'}`;

export const user_authenticate_address = `${API_address}/users/authenticate`;

export const user_sign_out_address = `${API_address}/users/logout`;

export const user_sign_up_address = `${API_address}/users/register`;

export const user_forget_password_address = `${API_address}/users/forget-password`;

export const user_change_password_address = `${API_address}/users/change-password`;

export const user_update_avatar_address = `${API_address}/users/update-avatar/`;

export const user_get_avatar_address = `${API_address}/users/image/`;

export const analysis_analyze_query = `${API_address}/check`
export const generate_captcha_query = `${API_address}/generate`

export const analysis_analyze_result = `${API_address}/result`