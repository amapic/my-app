
import React, { useState as useStateMock, setState } from 'react';

import { shallow, mount, render } from 'enzyme';

import Dashboard from './aamock'


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('<Home />', () => {
    let wrapper;

    const setState = jest.fn();
    jest.spyOn(global, 'setTimeout');

    beforeEach(async () => {
        useStateMock.mockImplementation(init => [init, setState]);

        wrapper = mount(<Dashboard />)
    });


    describe('Count Up', () => {
        it('calls setCount with count + 1', () => {
            
            wrapper.find('#count-up').first().simulate('click');
            expect(setState).toHaveBeenLastCalledWith(1);
            wrapper.find('#count-up').first().simulate('click');
            expect(setState).toHaveBeenLastCalledWith(2);
        });
    });
})