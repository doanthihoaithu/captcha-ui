import React from 'react'
import { shallow, render, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { store, userServices } from './../../services'

import SignOut from '.'

let component;

beforeEach(() => {
    component = mount(
        <Provider store={store}>
            <SignOut />
        </Provider>
    )
})

it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
})


it('should call function signUserOut when being clicked', () => {
    const signOutBtn = component.find("button");
    expect(signOutBtn.text()).toBe("Sign Out")

    const signUserOutFn = jest.spyOn(userServices, 'signUserOut')

    signOutBtn.simulate("click")

    expect(signUserOutFn).toHaveBeenCalledTimes(1)


})