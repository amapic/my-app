// import { shallow } from 'enzyme';
import { mount as mountEnzyme, render as renderEnzyme } from 'enzyme';
import { Graph_count_type_planete, Count_annee, Graph_masse_distance, Table, DessinSystemeSolaire } from '../component_planet/graph_planet';
import { waitFor, render, screen, getByText, cleanup } from "@testing-library/react";

import Dashboard from './aamock'
import { expect } from 'chai';
// import { async } from 'rxjs';
jest.setTimeout(100000)
// import sinon from 'sinon';
// import Foo from './Foo';

describe('<MyComponent />', () => {
  // var wrapper:any
  // beforeEach(() => {
  //   wrapper = mountEnzyme(<Table />);
  // });

  it('renders three <Foo /> components', async () => {
    const wrapper = renderEnzyme(<Dashboard />);
    await waitFor(() => {
    console.log(wrapper.html());
    expect(wrapper.find(".ee")).to.have.lengthOf(4);
    }, { timeout: 10000 })
  });


});