import "@testing-library/jest-dom"
// import 'resize-observer-polyfill' 

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
 
chai.use(chaiEnzyme())
Enzyme.configure({ adapter: new Adapter() });