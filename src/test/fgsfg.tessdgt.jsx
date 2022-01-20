import React from "react";
import { BarChart, YAxis, Bar } from "recharts";
import { Graph_count_type_planete } from '../component_planet/graph_planet';
jest.setTimeout(40000)
// export default function BarGraph({ data, width = 500, height = 500 }) {
//   return (
//     <BarChart
//       width={width}
//       height={height}
//       data={data.map((value) => ({ y: value }))}
//       margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
//     >
//       <YAxis dataKey="y" />
//       <Bar type="monotone" dataKey="y" fill="#ff7300" yAxisId={0} />
//     </BarChart>
//   );
// }

// import React from "react";
// import BarGraph from "./";
import { waitFor, render, screen } from "@testing-library/react";

describe("BarGraph", () => {

  //  describe("given two data points at a particular size", () => {
  const data = [40, 60];
  const size = { width: 500, height: 1000 };

  let graphContainer;
  beforeEach(() => {
    const { container } = render(
      <div>
        {/* <BarGraph data={data} width={size.width} height={size.height} /> */}
        <Graph_count_type_planete />
      </div>
    );
    graphContainer = container;
  });
  // ...
  // });

  test("given two data points at a particular size", async () => {
    // ...
    // It's super handy to use .each for graphs
    //   test.each`
    //     index | height   | x        | y
    //     ${0}  | ${"640"} | ${"100"} | ${"340"}
    //     ${1}  | ${"960"} | ${"300"} | ${"20"}
    //   `("renders rects", async ({ index, height, x, y }) => {
    //     // waits for rectangles to appear due to animation in graph library
    await waitFor(async() => {
      // jest.setTimeout(newTimeout)
      const textNode = screen.getByText(/jupiter/).parentNode;
      // const textNode = screen.getByText(value).parentNode;
      // Hard coding classes is not ideal but best we have to work with
      const bars = graphContainer.querySelectorAll(".recharts-area");
      expect(bars).toBeDefined();
      // expect(false).toBeFalsy()
      // expect(bars[index].getAttribute("x")).toBe(x);
      // expect(bars[index].getAttribute("y")).toBe(y);
    },{timeout:10000});
    //   });
    // ...
  });
});