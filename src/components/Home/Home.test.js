import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { store } from './../../services'
import * as actions from "../../services/redux/user/actions";
import { BrowserRouter as Router } from 'react-router-dom';

import Home from '.'

const userData = {
    username: 'test',
    access_token: 'access_token',
    refresh_token: 'refresh_token',
}

store.dispatch(actions.logIn(userData))

const wrapper = mount(
    <Provider store={store}>
        <Router>
            <Home />
        </Router>
    </Provider>
)

it('test if component render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h3.text-success").text()).toBe('Welcome back, test')
})