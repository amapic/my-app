
import React from 'react';
import Image from 'next/image'
import { Count_annee, Graph_masse_distance, Graph_zone_habitable, Taille_planete, Graph_radial, Moyenne_semi_major_moyen, Graph_rayon_moyen } from '../component_planet/graph_planet';
import { Total_planete } from '../component_planet/chiffre'
import {Navbar,NavItem} from '../component/navbar/navbar'
import 'bootstrap/dist/css/bootstrap.css';


const style:{} = {
  color: 'black'
};

// icon_up={<CaretIcon_up />} icon_down={<CaretIcon_down />}

export default function Dashboard() {


  return (

    <div className="wrapper">
    <React.StrictMode>
      <div id="content">
       
        <Navbar  >
          <NavItem  >
          </NavItem>
        </Navbar>

        {/* icon_up={<CaretIcon_up />} icon_down={<CaretIcon_down />} */}

        <header className="page-header header container-fluid">
          {/* AHAH */}
        </header>
        On raconte une histoire
        nombre de planète, progrès detection,
        nombre de planète habitable
        nombre de système multi planète
        <div className="container features mt-2">
          <div className="row gx-2">
            <div className="col-10">
              <div className="border border-dark rounded p-3 ">
                <h3 className="feature-title text-center">Planètes découvertes par an</h3>
                {/* <img src="images/column-1.jpg" className="img-fluid"> */}
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum quam odio, quis placerat ante luctus eu. Sed aliquet dolor id sapien rutrum, id vulputate quam iaculis.</p> */}
                <Count_annee />
                {/* <Graph_rayon_moyen /> */}

                <h3 className="feature-title text-center">Masse et période de révolution</h3>
                <Graph_masse_distance />
                Distance moyenne à l'étoile
                <Moyenne_semi_major_moyen />
                {/* <Graph_zone_habitable/> */}
                {/* <Taille_planete /> */}
              </div>
            </div>

            <div className="col-2">
              <div className="container features">
                <div className="row gy-2">
                  <div className="border border-dark rounded p-3">
                    <h3 className='text-center titre_col_droite'>Planète<br></br>découverte</h3>
                    <Total_planete />
                  </div>
                  <div className="border border-dark rounded p-3">

                    <h3 className='text-center titre_col_droite'>Planète<br></br>habitable</h3>
                    <h4><div className='text-center mx-0'>20</div></h4>
                  </div>
                  <div className="border border-dark rounded p-3">

                    <h3 className='text-center titre_col_droite'>Type de <br></br>planète</h3>

                    <Graph_radial />

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


