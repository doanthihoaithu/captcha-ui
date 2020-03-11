import React from 'react'
import { shallow } from 'enzyme'

import DefaultLayout from '.'

const wrapper = shallow(
    <DefaultLayout />
)

it('button should be rendered correctly', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find("div").hasClass('d-flex flex-column align-items-center')).toBe(true)
})