import { chercheData } from '../fonction/fonction'
import React, { useState } from 'react';
import Lien from '../component/navbar/navbar'
import renderer, { create, waitFor } from 'react-test-renderer';
import adresse from '../fonction/conf'
import { render, screen } from '@testing-library/react'

import { Graph_count_type_planete } from '../component_planet/graph_planet';

const { act } = renderer;

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
jest.setTimeout(30000);
describe('Space test suite', () => {
  // it('My Space Test', () => {
  //   expect(true).toEqual(true);
  // });


  // it('tests /destinations endpoints', async () => {

  //     // expect(["tt"]).toBeInstanceOf(Array)
  //     // expect(chercheData()).toMatch(/.*/)
  //     let hh=await chercheData()

  //     expect(hh).toBeInstanceOf(Object)
  //     expect(hh[0]).toBeInstanceOf(Object)
  //     expect(Object.keys(hh).length).toBeGreaterThan(500)

  // });

  

  // it('api_planete', () => {
  //   let hh = chercheData().then(planet=>{
  //     expect(planet).toBeDefined()
  //     expect(planet[0].star_name).toBeDefined()
  //     expect(Object.keys(planet).length).toEqual(4872)
  //   })
  // });

  it('test graph type de planète', async () => {
    let component;
    renderer.act(() => {
      component = renderer.create(<Graph_count_type_planete />)
    })
    const instance = component.root;
    let hh = component.toJson()
    console.log(hh);
    renderer.act(() => {
      component.unmount();
    });
    // instance.findByType(Graph_count_type_planete).toJson()
    // expect(instance.findByType(Graph_count_type_planete).props.foo).toBe('bar');
    // const instance = component.root;
    // const line= instance.findByType("path")
    // await waitFor(() => {
    //   expect(getByText('1600')).toBeInTheDocument()
    // },{timeout:6000,container:instance});
  });

});