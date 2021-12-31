import { chercheData } from '../fonction/fonction'
import React, { useState,setState } from 'react';
import Lien, { NavItem } from '../component/navbar/navbar'
import renderer, { create, waitFor } from 'react-test-renderer';
import adresse from '../fonction/conf'
// import { render, screen } from '@testing-library/react'
import { shallow, mount, render } from 'enzyme';
import { Graph_count_type_planete } from '../component_planet/graph_planet';

const { act } = renderer;
import Modal_window from '../component/navbar/modal';
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Space test suite', () => {


    it('test absence modal apparition écran', async () => {
        useRouter.mockImplementation(() => ({
            pathname: '/planet'
        }))
        const useStateSpy=jest.spyOn(React, "useState")
        useStateSpy.mockImplementation((init) => [init, setState]);
        const wrapper = mount(<NavItem />)
        // const instance = wrapper
        // const wrapper=NavItem()

        const gg = wrapper.find(Modal_window)
        // console.log(tree.children.findByType);
        // const testInstance = tree.root;
        // expect(wrapper.html()).toContain('Temps de développement');

        // const submitButton = wrapper.find('.icon-button')
        // let yy=submitButton[0].instance();


        // wrapper.update()
        // expect(setState).toHaveBeenCalledWith(true);

        // expect(wrapper.html()).toContain('Temps de développement')
        
    });


    // it('renders correctly lien vers page planète', () => {

    //     useRouter.mockImplementationOnce(() => ({
    //         pathname: '/'
    //     }))

    //     render(<Lien />)
    //     const lien = screen.getByText(/◄/)

    //     expect(lien.innerHTML).toMatch(/Dashboard exoplanète/);
    // });

    it('renders correctly lien vers page planète', () => {
        useRouter.mockImplementationOnce(() => ({
            pathname: '/planet'
        }))
        const tree = renderer
            .create(<Lien />)
            .toJSON();
        expect(tree.children[0]).toMatch(/Suivi de campagne vaccinatoire/);
    });


    // it('adresse origine de l api', () => {

    //   expect(adresse).toEqual("http://68.183.74.150")
    // });

});