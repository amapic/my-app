import { chercheData } from '../fonction/fonction'
// import {dataT,InputType} from '../types/interface'

// import Lien from '../component/navbar/navbar.test'
// import {CustomizedShape} from '../component_planet/graph_planet'
import renderer from 'react-test-renderer';
import Router, { useRouter } from 'next/router';

export default function Lien() {
    // Calling useRouter() hook
    const router = useRouter()
    console.log(router.pathname);
    if (router.pathname === '/planet') {
      return (
        <span className='navtext' onClick={() => Router.push('/')} > ◄  Suivi de campagne vaccinatoire</span>
      )
    } else {
      return (
        <span className='navtext' onClick={() => Router.push('/planet')} > ◄  Dashboard exoplanète</span>
      )
    }
  
  
  }
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

    it('renders correctly', () => {
        const tree = renderer
          .create(<Lien />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

});