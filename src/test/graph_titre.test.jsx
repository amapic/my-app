import React from "react";
import { BarChart, YAxis, Bar } from "recharts";
import { waitFor, render, screen, getByText, cleanup } from "@testing-library/react";
import { Graph_count_type_planete, Count_annee, Graph_masse_distance, Table, GraphiqueSystemeSolaire } from '../component_planet/graph_planet';
import Dashboard from './test'
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
import { mount, render as renderEnzyme } from 'enzyme';
jest.setTimeout(60000)
function BarGraph({ data, width = 500, height = 500 }) {
  return (
    <BarChart
      width={width}
      height={height}
      data={data.map((value) => ({ y: value }))}
      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
    >
      <YAxis dataKey="y" />
      <Bar type="monotone" dataKey="y" fill="#ff7300" yAxisId={0} />
    </BarChart>
  );
}

describe("Graph et titre", () => {
  describe.skip("Graph", () => {
    describe.skip("Graph type de planète", () => {
      const data = [40, 60];
      const size = { width: 500, height: 1000 };
      // afterEach(wrapper.unmount())
      // var wrapper;
      let graphContainer;
      beforeEach(() => {
        const { container } = render(
          <div>
            <Table />
          </div>
        );
        graphContainer = container;

      });

      test("il y a plus de 2 lignes dans le tableau", async () => {
        await waitFor(() => {
          const bars = graphContainer.querySelectorAll(".table-row")
          expect(bars.length).toBeGreaterThan(2)

        }, { timeout: 10000 });

      });

      // test("la première ligne a une couleur différente", async () => {
      //   await waitFor(() => {
      //     const bars = document.querySelector(".table-row")
      //     expect(bars.text()).not.toBe(''); 
      //     console.log(document);
      //   }, { timeout: 10000 });

      // });

      // test.each`
      //     index |  type        
      //     ${0}  |  ${"col1"} 
      //     ${1}  |  ${"col2"} 
      //     ${2}  |  ${"col3"} 
      //     ${2}  |  ${"col4"} 
      //   `
      //   ("le titre des types est affiché", async ({ index, type }) => {
      //     await waitFor(() => {
      //       const bars = graphContainer.querySelector(".table-row " +type)
      //       expect(bars.text()).not.toBe(''); 
      //     }, { timeout: 10000 });

      //   });


    });
  });


  describe.skip("Graph", () => {
    describe.only("Graph type de planète", () => {

      let graphContainer;
      beforeEach(() => {
        const { container } = render(
          <div>
            <Graph_count_type_planete />
          </div>
        );
        graphContainer = container;
      });

      // test("les 5 types de planètes sont représentés", async () => {
      //   await waitFor(() => {
      //     const bars = graphContainer.querySelectorAll(".recharts-rectangle")
      //     expect(bars.length).toBe(5)
      //   }, { timeout: 3000 });


      // });

      test.each`
        index |  type        
        ${0}  |  ${"super-jupiter"} 
        ${1}  |  ${"terrestre"} 
        ${2}  |  ${"jupiter"} 
        ${3}  |  ${"super-terre"} 
        ${4}  |  ${"neptune"} 
      `
        ("le titre des types est affiché", async ({ index, type }) => {
          // waits for rectangles to appear due to animation in graph library
          await waitFor(() => {

            expect(getByText(graphContainer, type)).toHaveTextContent(
              type
            )

          }, { timeout: 5000 });

        });


    });
  });

  describe("Graph planète découverte par an", () => {

    let graphContainer;
    beforeEach(() => {
      const { container } = render(
        <div>
          <Count_annee />
        </div>
      );
      graphContainer = container;
    });

    test("les barres sont affichés", async () => {
      await waitFor(() => {
        const bars = graphContainer.querySelectorAll(".recharts-rectangle")
        expect(bars.length).toBeGreaterThan(25)
      }, { timeout: 3000 });


    });

  });

  describe("Graph Masse distance", () => {
    const data = [40, 60];
    const size = { width: 500, height: 1000 };

    let graphContainer;
    beforeEach(() => {
      const { container } = render(
        <div>
          <Graph_masse_distance />
        </div>
      );
      graphContainer = container;
    }, { timeout: 5000 });


    test.each`
        index |  type        
        ${0}  |  ${"0.01 Mjup"} 
        ${1}  |  ${"365 jour"} 
        ${2}  |  ${"10 jour"} 
        ${3}  |  ${"1 jour"} 
        ${4}  |  ${"1 Mjup"} 
        ${5}  |  ${"100 Mjup"} 
        ${6}  |  ${"10 Mjup"} 
        ${7}  |  ${"0.01 Mjup"} 
      `
      ("les légendes sont oks", async ({ index, type }) => {
        // waits for rectangles to appear due to animation in graph library
        await waitFor(() => {
          expect(getByText(graphContainer, type)).toHaveTextContent(
            type
          )

        }, { timeout: 3000 });

      });

    // test("les 3 planèts sont ok", async () => {
    //   // waits for rectangles to appear due to animation in graph library
    //   await waitFor(() => {

    //     expect(getByText(graphContainer, /Jupiter/)).toHaveTextContent(
    //       "Jupiter"
    //     )

    //     expect(getByText(graphContainer, /Jupiter/)).toHaveTextContent(
    //       "Jupiter"
    //     )

    //     expect(getByText(graphContainer, /Jupiter/)).toHaveTextContent(
    //       "Jupiter"
    //     )

    //   }, { timeout: 10000 });

    // });


  });


  // test("les 3 planèts sont ok", async () => {
  //   // waits for rectangles to appear due to animation in graph library
  //   await waitFor(() => {

  //     expect(getByText(graphContainer, /Jupiter/)).toHaveTextContent(
  //       "Jupiter"
  //     )

  //     expect(getByText(graphContainer, /Jupiter/)).toHaveTextContent(
  //       "Jupiter"
  //     )

  //     expect(getByText(graphContainer, /Jupiter/)).toHaveTextContent(
  //       "Jupiter"
  //     )

  //   }, { timeout: 10000 });

  // });


  // });




  // });

  // describe("Titre", () => {
  //   let graphContainer;
  //   let texte;
  //   let texte2;
  //   afterEach(cleanup)

  //   beforeEach(() => {
  //     useRouter.mockImplementation(() => ({
  //       pathname: '/planet'
  //     }))
  //     const { container, screen } = render(
  //       <div>
  //         <Dashboard />
  //       </div>
  //     );
  //     graphContainer = container;
  //   }, { timeout: 30000 });

  //    test.each`
  //         index |  type        
  //         ${0}  |  ${"Historique"} 
  //         ${1}  |  ${"Masse et période de révolution"} 
  //         ${2}  |  ${"Planètes découvertes par an"} 
  //         ${3}  |  ${"Planètes du système sélectionné"}
  //         ${4}  |  ${"Planète découverte"}
  //         ${5}  |  ${"Planète habitable"}
  //         ${6}  |  ${"Type de planète"} 
  //       `
  //   ("Titre Page", async ({index,type}) => {
  //     await waitFor(() => {
  //       texte = screen.getByText(type)
  //       expect(texte).toBeInTheDocument();

  //     }, { timeout: 3000 });

  //   })

  // })

  describe("Titre", () => {
    let graphContainer;
    let texte;
    afterEach(cleanup)

    beforeEach(() => {
      useRouter.mockImplementation(() => ({
        pathname: '/planet'
      }))
      const { container, screen } = render(
        <div>
          <Dashboard />
        </div>
      );
      graphContainer = container;
    }, { timeout: 5000 });


    it("Titre Contenu Chiffre", async () => {
      await waitFor(() => {
        texte = screen.getByTestId("testid1")
        expect(texte).toBeInTheDocument();

      }, { timeout: 3000 });

    })

    it("Titre Contenu Chiffre", async () => {
      await waitFor(() => {
        texte = screen.getByTestId("testid2")
        expect(texte).toBeInTheDocument();

      }, { timeout: 3000 });

    })

  })

  describe.skip("BarGraph", () => {
    const data = [40, 60];
    const size = { width: 500, height: 1000 };

    let graphContainer;
    beforeEach(() => {
      const { container } = render(
        <div>
          <BarGraph data={data} width={size.width} height={size.height} />
          {/* <BarGraph /> */}
        </div>
      );
      graphContainer = container;
    });

    describe("given two data points at a particular size", () => {
      // ...
      test.each`
        value   | x       | y
        ${"15"} | ${"72"} | ${"740"}
        ${"30"} | ${"72"} | ${"500"}
        ${"45"} | ${"72"} | ${"260"}
        ${"60"} | ${"72"} | ${"20"}
      `("displays $value in the correct position", ({ value, x, y }) => {
        // By testing the position of the tick we are also testing it existence, it's a two for one deal.
        const textNode = screen.getByText(value).parentNode;
        expect(textNode.getAttribute("y")).toBe(y);
        expect(textNode.getAttribute("x")).toBe(x);
      });
    });
  });
});