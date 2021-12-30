import { chercheData } from '../fonction/fonction'
import React, { useState } from 'react';
import Lien from '../component/navbar/navbar'
import renderer from 'react-test-renderer';
import adresse from '../fonction/conf'



const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Space test suite', () => {
  it('My Space Test', () => {
    expect(true).toEqual(true);
  });


  // it('tests /destinations endpoints', async () => {

  //     // expect(["tt"]).toBeInstanceOf(Array)
  //     // expect(chercheData()).toMatch(/.*/)
  //     let hh=await chercheData()

  //     expect(hh).toBeInstanceOf(Object)
  //     expect(hh[0]).toBeInstanceOf(Object)
  //     expect(Object.keys(hh).length).toBeGreaterThan(500)

  // });
  
  // it('renders correctly lien vers page vaccin', () => {
  //   useRouter.mockImplementationOnce(() => ({
  //     pathname: '/planet'
  //   }))
  //   const tree = renderer
  //     .create(<Lien />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders correctly lien vers page planète', () => {
  //   useRouter.mockImplementationOnce(() => ({
  //     pathname: '/planets'
  //   }))
  //   const tree = renderer
  //     .create(<Lien />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  it('adresse origine de l api', () => {
    
    expect(adresse).toEqual("http://68.183.74.150")
  });

  it('api_planete', () => {
    let hh = chercheData().then(planet=>{
      expect(planet).toBeDefined()
      expect(planet[0].star_name).toBeDefined()
      expect(Object.keys(planet).length).toEqual(4872)
    })
  });

  it('test graph type de planète', () => {
    const tree = renderer
      .create(<Lien />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });



});