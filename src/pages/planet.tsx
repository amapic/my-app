
import React from 'react';
import { Count_annee, Graph_masse_distance,  Graph_count_type_planete,DessinSystemeSolaire } from '../component_planet/graph_planet';
import { Navbar, NavItem } from '../component/navbar/navbar'
import Total_planete from '../component_planet/chiffre'
import 'bootstrap/dist/css/bootstrap.css';

export default function Dashboard():JSX.Element {
  return (

    <div className="wrapper">
      <React.StrictMode>
        <div id="content">

          <Navbar  >
            <NavItem  >
            </NavItem>
          </Navbar>

          <div className="container mt-2">
            <div className="row gx-2">
              <div className="col-10">
                <div  className="border border-dark rounded p-2 mb-5">
                <h4 id="titre_interne_0" className="animate-pulse feature-title text-center">Historique</h4>
                <p style={{textIndent:"5%"}}>En 1995, la première exoplanète est découverte par Michel Mayor et ses collaborateurs à l'observatoire de Haute Provence.
                  Depuis, de nombreuses autres planètes plus petites et plus éloignées de leurs étoiles, donc plus difficile à repérer, ont été trouvées.
                  </p>
                  <br></br>
                  <h4 id="titre_interne_1" className="feature-title text-center">Masse et période de révolution</h4>
                  <Graph_masse_distance />
                  <p style={{textIndent:"5%"}} >De plus en plus de planète sont trouvées au fil des ans grâce à de nouveau instrument.</p>
                  <br></br>
                  <h4 id="titre_interne_2" className="feature-title text-center">Planètes découvertes par an</h4>
                  <Count_annee />


                  <br></br>
                  <p style={{textIndent:"5%"}}>Aujourd'hui des systèmes solaires contenant jusqu'à 8 planètes sont connus.</p>
                  <br></br>
                  <DessinSystemeSolaire />
                </div>
              </div>

              <div className="col-2">
                <div className="container features">
                  <div className="row gy-2">
                    <div className="border border-dark rounded p-3">
                      <h4 id="titre_count_planete" className='text-center titre_col_droite'>Planète<br></br>découverte</h4>
                      <Total_planete />
                    </div>
                    <div className="border border-dark rounded p-3">

                      <h4 className='text-center titre_col_droite'>Planète<br></br>habitable</h4>
                      <h4><div id="titre_count_planete_habitable" data-testid="testid2" className='text-center mx-0'>20</div></h4>
                    </div>
                    <div className="border border-dark rounded p-3">

                      <h4 id="titre_count_type_planete" className='text-center titre_col_droite'>Type de <br></br>planète</h4>

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


