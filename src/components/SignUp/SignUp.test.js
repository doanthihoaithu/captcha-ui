import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from '.';
import { store, userServices } from './../../services';


let component;
let registerNewUserAPI;


beforeEach(() => {
    component = mount(
        <Router>
            <Provider store={store}>
                <SignUp />
            </Provider>
        </Router>
    )
    registerNewUserAPI = jest.spyOn(userServices, 'registerNewUser').mockReturnValue(Promise.resolve("value"));
})

afterEach(() => {
    registerNewUserAPI.mockReset();
    component.unmount();
})

it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
})


it('should not call function registerNewUser when submit nothing', () => {
    let registerNewUserForm = component.find("form");

    registerNewUserForm.simulate('submit');

    registerNewUserAPI.mockClear();
    expect(registerNewUserAPI).toHaveBeenCalledTimes(0);
})

it('should call function registerNewUser when submit valid data', async () => {
    let registerNewUserForm = component.find("form");

    component.find("input[id='exampleInputUsername1']").getDOMNode().value = ("username")
    component.find("input[id='name']").getDOMNode().value = ("User Full Name")
    component.find("input[id='exampleEmail1']").getDOMNode().value = ("useremail@example.com")
    component.find("input[id='exampleInputPassword1']").getDOMNode().value = ("newpassword")

    component.update()

    expect(component.find("input")).toHaveLength(4)
    await registerNewUserForm.simulate('submit');

    expect(registerNewUserAPI).toHaveBeenCalledTimes(1);
})

it('should not call function registerNewUser when submit invalid data', async () => {
    let registerNewUserForm = component.find("form");

    component.find("input[id='exampleInputUsername1']").getDOMNode().value = ("username")
    component.find("input[id='name']").getDOMNode().value = ("User Full Name")
    component.find("input[id='exampleEmail1']").getDOMNode().value = ("wrongEmail")
    component.find("input[id='exampleInputPassword1']").getDOMNode().value = ("newpassword")

    component.update()

    expect(component.find("input")).toHaveLength(4)
    await registerNewUserForm.simulate('submit');

    expect(registerNewUserAPI).toHaveBeenCalledTimes(0);
})