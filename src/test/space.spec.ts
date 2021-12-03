import { chercheData } from '../component_planet/graph_planet'
import {dataT,InputType} from '../types/interface'
export { }
describe('Space test suite', () => {
    it('My Space Test', () => {
        expect(true).toEqual(true);
    });


    it('tests /destinations endpoints', async () => {

        // expect(["tt"]).toBeInstanceOf(Array)
        // expect(chercheData()).toMatch(/.*/)
        let hh=await chercheData()
        
        expect(hh).toBeInstanceOf(Object)
        expect(hh[0]).toBeInstanceOf(Object)
        expect(Object.keys(hh).length).toBeGreaterThan(500)

    });

});