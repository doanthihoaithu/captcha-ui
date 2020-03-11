import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from '.';
import { store, userServices } from './../../services';


let component;
let signUserInAPI;

beforeEach(() => {
    component = mount(
        <Router>
            <Provider store={store}>
                <SignIn />
            </Provider>
        </Router>
    )
    signUserInAPI = jest.spyOn(userServices, 'signUserIn').mockReturnValue(Promise.resolve("value"));
})

afterEach(() => {
    signUserInAPI.mockReset();
    component.unmount();
})

it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
})


it('should not call function signUserIn when submit nothing', () => {
    let signUserInAPI = jest.spyOn(userServices, 'signUserIn');

    let signUserInForm = component.find("form");

    signUserInForm.simulate('submit');

    expect(signUserInAPI).toHaveBeenCalledTimes(0);
})

it('should call function signUserIn when submit valid data', async () => {
    let signUserInForm = component.find("form");

    component.find("input[id='exampleInputUsername1']").getDOMNode().value = ("username")
    component.find("input[id='exampleInputPassword1']").getDOMNode().value = ("newpassword")

    component.update()

    expect(component.find("input")).toHaveLength(2)
    await signUserInForm.simulate('submit');

    expect(signUserInAPI).toHaveBeenCalledTimes(1);
})

it('should not call function signUserIn when submit invalid data', async () => {
    let signUserInForm = component.find("form");

    component.find("input[id='exampleInputUsername1']").getDOMNode().value = ("")
    component.find("input[id='exampleInputPassword1']").getDOMNode().value = ("newpassword")

    component.update()

    expect(component.find("input")).toHaveLength(2)
    await signUserInForm.simulate('submit');

    expect(signUserInAPI).toHaveBeenCalledTimes(0);
})