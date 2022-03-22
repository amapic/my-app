
import React, { Suspense } from 'react';
import GraphiqueSystemeSolaire, { Test_svg, Count_annee, Graph_masse_distance, Liste_planete, Graph_count_type_planete } from '../component_planet/graph_planet';
import { Navbar, NavItem } from '../component/navbar/navbar'
import Total_planete from '../component_planet/chiffre'
import 'bootstrap/dist/css/bootstrap.css';
import { liste_planete_par_systeme } from '../fonction/fonction'
import CountUp from 'react-countup';
import Login from '../Login/Login';

// const GraphiqueSystemeSolaire = React.lazy(() => import('../component_planet/graph_planet'));
export default function Dashboard(): JSX.Element {
  liste_planete_par_systeme()
  return (

    <div className="wrapper">
      <React.StrictMode>
        <div id="content">

          <Navbar  >
            <NavItem  >
            </NavItem>
          </Navbar>

          <div className="mt-2 ps-3 pe-3">
            <div className="rounded  p-2 mb-5">
              <Login />
              {/* AAAAAAAAA */}
              <h4 id="titre_interne_0" className="animate-pulse feature-title text-left">Historique</h4>
              <p style={{ textIndent: "0%" }}>En 1995, la première exoplanète est découverte par Michel Mayor et ses collaborateurs à l'observatoire de Haute Provence.
                Depuis, de nombreuses autres planètes plus petites et plus éloignées de leurs étoiles, donc plus difficile à repérer, ont été trouvées.
              </p>
              <br></br>
              <h6 id="titre_interne_1" className="feature-title text-center">Masse et période de révolution</h6>
              <Graph_masse_distance />
            </div>
          </div>
          <div className="mt-2 ps-3 pe-3" style={{ backgroundColor: '#E7E7E9' }}>
            <br></br>
            <br></br>
            <h4 id="titre_interne_2" className="feature-title text-left">Un nombre élevé de planètes découvertes par an</h4>
            <br></br>
            <p style={{ textIndent: "0%" }} >De plus en plus de planète sont trouvées au fil des ans grâce à de nouveau instrument.</p>

            <br></br>
            <h6 id="titre_interne_1" className="feature-title text-center">Planètes découvertes chaque année</h6>
            <Count_annee />
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="mt-2 ps-3 pe-3">
            <h4 id="titre_interne_2" className="animate-pulse feature-title text-left">Bilan</h4>

            <div className="row row-eq-height equal gx-5 justify-content-center mt-5 mb-5">

              <div className="col-3 w-35 my-2">
                <div className="card_perso justify-content-center align-items-center p-3 h-100">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h4 className='text-center titre_col_droite'>Planète<br></br>tempérée</h4>
                    </div>
                    <div className="col-12">
                      <h4><div id="titre_count_planete_habitable" data-testid="testid2" className='text-center mx-0'>
                        <CountUp end={20} duration={5} />
                      </div></h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3 w-35 my-2">
                <div className="card_perso justify-content-center align-items-center  p-3 h-100">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h4 className='text-center titre_col_droite'>Planète<br></br>découverte</h4>
                    </div>
                    <div className="col-12">
                      {/* <h4><div id="titre_count_planete_habitable" data-testid="testid2" className='text-center mx-0'>20</div></h4> */}
                      <Total_planete />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3 w-35 my-2">
                <div className="card_perso align-items-center  p-3 h-100">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h4 className='text-center titre_col_droite'>Type de planète</h4>
                    </div>
                    {/* <div className="col-12">
                      <h4><div id="titre_count_planete_habitable" data-testid="testid2" className='text-center mx-0'>20</div></h4>
                    </div> */}
                    <Graph_count_type_planete />
                  </div>
                </div>
              </div>
              {/* <div className="col-3 w-35 my-2">
                <div className="card p-3">

                  <h4 id="titre_count_type_planete" className='text-center titre_col_droite'>Type de <br></br>planète</h4>
                  <Graph_count_type_planete />

                </div>
              </div> */}
            </div>


            <div className="mt-5 p-3">
              {/* <div > */}
              <div>
                <br></br>
                <p style={{ textIndent: "0%" }}>Aujourd'hui des systèmes solaires contenant jusqu'à 8 planètes sont connus.</p>
                <br></br>

                {/* <Suspense fallback={<div>Chargement...</div>}> */}
                <GraphiqueSystemeSolaire />
                {/* </Suspense> */}
              </div>
              {/* </div> */}
            </div>
          </div>



        </div >
      </React.StrictMode >
    </div >
  )
}
