// import { shallow } from 'enzyme';
import { mount as mountEnzyme, render as renderEnzyme } from 'enzyme';
import { Graph_count_type_planete, Count_annee, Graph_masse_distance, Table, DessinSystemeSolaire } from '../component_planet/graph_planet';
import { waitFor, render, screen, getByText, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Dashboard, { Fc_containing_FC } from './aamock'
import { expect } from 'chai';
// import { async } from 'rxjs';
jest.setTimeout(100000)
// import sinon from 'sinon';
// import Foo from './Foo';
import { render as render_react_dom, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
describe('<MyComponent />', () => {
  // var wrapper:any
  // beforeEach(() => {
  //   wrapper = mountEnzyme(<Table />);
  // });
  let wrapper: any = null;
  // beforeEach(() => {
  //   // setup a DOM element as a render target
  //   wrapper = document.createElement("div");
  //   document.body.appendChild(wrapper);
  // });

  it('renders three <Foo /> components', async () => {
    // var wrapper:any

    // await act(async () => {
    //   render_react_dom(<Fc_containing_FC />, wrapper);
    // });
    // // await new Promise((r) => setTimeout(r, 10000));
    // console.log(wrapper.innerHTML);
    // await waitFor(() => {

    //   expect(wrapper.querySelectorAll(".rr").length).to.be.equal(0)
    // }, { timeout: 10000 })
    render(<Fc_containing_FC />)

    await waitFor(() => expect(screen.getByText("AAA")).to.have.lengthOf(1));
  });


});