import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ForgetPassword from '.';
import { store, userServices } from './../../services';
import * as actions from './../../services/redux/user/actions';

const userData = {
    username: 'admintest',
    access_token: 'access_token',
    refresh_token: 'access_token',
}

//create user data in redux store
store.dispatch(actions.logIn(userData))

let component;
let resetPasswordAPI;

beforeEach(() => {
    component = mount(
        <Router>
            <Provider store={store}>
                <ForgetPassword />
            </Provider>
        </Router>
    )

    resetPasswordAPI = jest.spyOn(userServices, 'resetPassword').mockReturnValue(Promise.resolve("value"));
})

afterEach(() => {
    resetPasswordAPI.mockReset();
    component.unmount();
})

it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
})


it('should not call function resetPassword when submit nothing', () => {
    let resetPasswordForm = component.find("form");

    resetPasswordForm.simulate('submit');

    expect(resetPasswordAPI).toHaveBeenCalledTimes(0);
})

it('should call function resetPassword when submit valid data', () => {
    let resetPasswordForm = component.find("form");

    component.find("input[id='exampleInputUsername1']").getDOMNode().value = 'username'
    component.find("input[id='exampleEmail1']").getDOMNode().value = 'useremail@example.com'

    component.update()

    expect(component.find("input")).toHaveLength(2)
    resetPasswordForm.simulate('submit');

    expect(resetPasswordAPI).toHaveBeenCalledTimes(1);
})


it('should not call function resetPassword when submit invalid data', () => {
    let resetPasswordForm = component.find("form");

    component.find("input[id='exampleInputUsername1']").getDOMNode().value = 'username'
    component.find("input[id='exampleEmail1']").getDOMNode().value = 'invalidUserEmail'

    component.update()

    expect(component.find("input")).toHaveLength(2)
    resetPasswordForm.simulate('submit');

    expect(resetPasswordAPI).toHaveBeenCalledTimes(0);
})