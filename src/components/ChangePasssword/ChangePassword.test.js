import React from 'react'
import { shallow, render, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { store, userServices } from './../../services'
import * as actions from './../../services/redux/user/actions';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import ChangePassword from '.'

let userData = {
    username: 'admintest',
    access_token: 'access_token',
    refresh_token: 'access_token',
}

//create user data in redux store
store.dispatch(actions.logIn(userData))

let component;
let changePasswordAPI;

beforeEach(() => {
    component = mount(
        <Router>
            <Provider store={store}>
                <ChangePassword />
            </Provider>
        </Router>
    )

    changePasswordAPI = jest.spyOn(userServices, 'changePassword').mockReturnValue(Promise.resolve("value"));
})

afterEach(() => {
    changePasswordAPI.mockReset();
    component.unmount();
})

it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
})


it('should not call function changePassword when submit nothing', () => {
    let changePasswordForm = component.find("#changePasswordForm");

    changePasswordForm.simulate('submit');

    expect(changePasswordAPI).toHaveBeenCalledTimes(0);
})

it('should call function changePassword when submit valid data', () => {
    let changePasswordForm = component.find("#changePasswordForm");

    component.find("input[id='oldPassword']").getDOMNode().value = ("oldpassword")
    component.find("input[id='newPassword']").getDOMNode().value = ("newpassword")
    component.find("input[id='confirmNewPassword']").getDOMNode().value = ("newpassword")

    component.update()

    expect(component.find("input")).toHaveLength(3)
    changePasswordForm.simulate('submit');

    expect(changePasswordAPI).toHaveBeenCalledTimes(1);
})

it('should not call function changePassword when submit invalid data', () => {
    let changePasswordForm = component.find("#changePasswordForm");

    component.find("input[id='oldPassword']").getDOMNode().value = ("")
    component.find("input[id='newPassword']").getDOMNode().value = ("newpass")
    component.find("input[id='confirmNewPassword']").getDOMNode().value = ("newpass")

    component.update()

    expect(component.find("input")).toHaveLength(3)
    changePasswordForm.simulate('submit');

    expect(changePasswordAPI).toHaveBeenCalledTimes(0);
})