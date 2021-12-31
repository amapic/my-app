import "@testing-library/jest-dom"
// import 'resize-observer-polyfill' 

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });