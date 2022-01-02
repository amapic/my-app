import { chercheData } from '../fonction/fonction'
import React, { useState as useStateMock, setState } from 'react';
// import * from 'react'
import Lien, { NavItem } from '../component/navbar/navbar'
// import renderer, { create, waitFor } from 'react-test-renderer';
import adresse from '../fonction/conf'
// import { render, screen } from '@testing-library/react'
import { shallow, mount, render } from 'enzyme';
import { Graph_count_type_planete } from '../component_planet/graph_planet';

// const { act } = renderer;
import Modal_window from '../component/navbar/modal';
import Home from './aamock'
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
// const useStateSpy=jest.spyOn(React, "useState")
// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn()
//   }));
//   const useStateMock = useState;

// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn(),
// }));

// import React, { useState } from "react";


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

// export default Home;
describe('<Home />', () => {
    let wrapper;

    const setState = jest.fn();

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState]);
        useRouter.mockImplementation(() => ({
            pathname: '/planet'
        }))
        wrapper = mount(<NavItem />)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Count Up', () => {
        it('calls setCount with count + 1', () => {
            // wrapper.find('#count-up').simulate('click');
            wrapper.find('.icon-button').first().simulate('click');
            expect(setState).toHaveBeenLastCalledWith(true);
        });
    });

})

// const useStateMock = jest.spyOn(React, 'useState');
// describe('Space test suite', () => {


//     it('test absence modal apparition écran', async () => {
//         useRouter.mockImplementation(() => ({
//             pathname: '/planet'
//         }))


//         const setOpen = jest.fn();
//         useStateMock.mockImplementation((init) => [init, setOpen]);
//         // const setOpen = jest.fn();
//         // useStateMock.mockImplementation((init) => [init, setOpen]);


//         const wrapper = mount(<NavItem />)


//         const gg = wrapper.find(Lien)
//         // const moddal = wrapper.find(Modal_window)
//         expect(wrapper.find(Lien).length).toBe(1)
//         // expect(wrapper.find(Modal_window).prop('show')).toBeTruthy()
//         const aLink = wrapper.find('.icon-button').first()
//         aLink.simulate("click")

//         // console.log("ee");
//         // const testInstance = tree.root;
//         // expect(wrapper.html()).toContain('Temps de développement');

//         // const submitButton = wrapper.find('.icon-button')
//         // let yy=submitButton[0].instance();


//         // wrapper.update()
//         // expect(setOpen).toHaveBeenLastCalledWith(true);
//         const modal = wrapper.find(Modal_window)
//         console.log(modal.html());
//         expect(wrapper.find(Modal_window).length).toBe(1)
//         expect(wrapper.find(Modal_window).prop('show')).toBeTruthy()

//         // expect(wrapper.html()).toContain('Temps de développement')

//     });


//     // it('renders correctly lien vers page planète', () => {

//     //     useRouter.mockImplementationOnce(() => ({
//     //         pathname: '/'
//     //     }))

//     //     render(<Lien />)
//     //     const lien = screen.getByText(/◄/)

//     //     expect(lien.innerHTML).toMatch(/Dashboard exoplanète/);
//     // });

//     // it('renders correctly lien vers page planète', () => {
//     //     useRouter.mockImplementationOnce(() => ({
//     //         pathname: '/planet'
//     //     }))
//     //     const tree = renderer
//     //         .create(<Lien />)
//     //         .toJSON();
//     //     expect(tree.children[0]).toMatch(/Suivi de campagne vaccinatoire/);
//     // });


//     // it('adresse origine de l api', () => {

//     //   expect(adresse).toEqual("http://68.183.74.150")
//     // });

// });