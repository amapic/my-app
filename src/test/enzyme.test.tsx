// import { shallow } from 'enzyme';
import React, { useState as useStateMock } from 'react';
import { waitFor, render, screen, getByText, cleanup } from "@testing-library/react";
import { render as renderEnzyme } from 'enzyme';
import Dashboard, { Fc_containing_FC,Fc } from './test'
import { expect } from 'chai';
import {describe, expect as expectjs, it } from '@jest/globals'
jest.setTimeout(100000)
// import { chercheData as chercheDataMock } from '../fonction/fonction'

describe('<MyComponent />', () => {
  let wrapper: any = null;

  // jest.mock('../fonction/fonction', () => ({
  //   ...jest.requireActual('../fonction/fonction'),
  //   chercheData: jest.fn(),
  // }));
  const chercheData = jest.spyOn(require('../fonction/fonction'), 'chercheData')
  beforeAll(() => {
    chercheData.mockImplementation(() => {
      console.log('rr');
      Promise.resolve(
        {
          id: 1,
          name: "a",
          mass: 1,
          orbital_period: 2,
          discovered: 1,
          radius: 1,
          semi_major_axis: 1,
          star_distance: 1,
          temp: 1,
          method: "e",
          star_name: "r"
        });
    });
  });
  it('renders three <Foo /> components', async () => {
    
    
    const wrapper = renderEnzyme(<Fc />)
    // expectjs(chercheData).toBeCalled();
    console.log(wrapper.html());
    expect(wrapper.html()).to.contain('AAAAA');
  });


});
