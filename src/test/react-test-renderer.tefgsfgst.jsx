import { create, act } from 'react-test-renderer';
// import App from './app.js'; // The component being tested
import { Graph_count_type_planete } from '../component_planet/graph_planet';

// render the component
let root;
act(() => {
    root = create(<Graph_count_type_planete />)
});
describe("BarGraph", () => {
    // make assertions on root 
    test("given two data points at a particular size",  () => {
        expect(root.toJSON()).toMatchSnapshot();
    });
});
// update with some different props
// act(() => {
//   root.update(<App value={2}/>);
// })

// // make assertions on root 
// expect(root.toJSON()).toMatchSnapshot();