
import React from 'react';
import { Count_annee, Graph_masse_distance,  Graph_count_type_planete,DessinSystemeSolaire } from '../component_planet/graph_planet';
import { Navbar, NavItem } from '../component/navbar/navbar'
import 'bootstrap/dist/css/bootstrap.css';

export default function Dashboard() {
  return (

    <div className="wrapper">
      <React.StrictMode>
        <div id="content">

          <Navbar  >
            <NavItem  >
            </NavItem>
          </Navbar>

          <div className="container features mt-2">
            <div className="row gx-2">
              <div className="col-10">
                <div id="aaaa" className="border border-dark rounded p-3 mb-5">
                <h3 className="feature-title text-center">Historique</h3>
                <span style={{zIndex:-1}}>En 1995, la première exoplanète est découverte par Michel Mayor et ses collaborateurs à l'observatoire de Haute Provence.
                  Depuis, de nombreuses autres planètes plus petites et plus éloignées de leurs étoiles, donc plus difficile à repérer, ont été trouvées.
                  </span>
                  <br></br>
                  <br></br>
                  <h3 className="feature-title text-center">Masse et période de révolution</h3>
                  <Graph_masse_distance />
                  <br></br>
                  <span style={{zIndex:-1}}>De plus en plus de planète sont trouvées au fil des ans grâce à de nouveau instrument.</span>
                  <br></br>
                  <br></br>
                  <h3 className="feature-title text-center">Planètes découvertes par an</h3>
                  <Count_annee />


                  <h3 className="feature-title text-center">Masse et période de révolution</h3>
                  <br></br>
                  Aujourd'hui des systèmes solaires contenant jusqu'à 8 planètes sont connus.
                  <br></br>
                  <DessinSystemeSolaire />
                </div>
              </div>

              <div className="col-2">
                <div className="container features">
                  <div className="row gy-2">
                    <div className="border border-dark rounded p-3">
                      <h3 className='text-center titre_col_droite'>Planète<br></br>découverte</h3>
                      {/* <Total_planete /> */}
                    </div>
                    <div className="border border-dark rounded p-3">

                      <h3 className='text-center titre_col_droite'>Planète<br></br>habitable</h3>
                      <h4><div className='text-center mx-0'>20</div></h4>
                    </div>
                    <div className="border border-dark rounded p-3">

                      <h3 className='text-center titre_col_droite'>Type de <br></br>planète</h3>

                      <Graph_count_type_planete />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </React.StrictMode>
    </div>
  )
}


