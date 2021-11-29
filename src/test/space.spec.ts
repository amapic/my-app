import { chercheData, AA } from '../component_planet/graph_planet'

// const {chercheData}=require('../pages/planet')
export { }
describe('Space test suite', () => {
    it('My Space Test', () => {
        expect(true).toEqual(true);
    });
    // it('tests /destinations endpoints', async() => {

    //     expect(["tt"]).toBeInstanceOf(Array)
    //     await expect(chercheData()).resolves.toBeInstanceOf(Array)

    // });

    it('tests /destinations endpoints', async () => {

        // expect(["tt"]).toBeInstanceOf(Array)
        // expect(chercheData()).toMatch(/.*/)
        // let hh=chercheData()
        // if(!expect(chercheData()).resolves.toBeInstanceOf(Array)) {console.log('res',res)}
        // await expect(chercheData()).resolves.toBeInstanceOf(Object)
        await expect(chercheData()).resolves.toEqual(2);

    });

});