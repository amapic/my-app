
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
          {/* {router.pathname === '/planet' ? */}
                <span>
                    -  Partie React de la page réalisée en 2 jours<br></br>
                    -  Réalisation des graphiques et des svg en 2 jours<br></br>
                    -  Récupération / analyse des données en 1 jour<br></br>
                    -  Mise en place API en 1/2 journée<br></br>
                </span>
                {/* // : */}
                <span>
                    -  Partie React de la page réalisée en 4 jours<br></br>
                    -  Réalisation des graphiques et des svg en 3 jours<br></br>
                    -  Récupération / analyse des données en 2 jours<br></br>
                    -  Mise en place API en 3 jours<br></br>
                </span>
            {/* } */}
          </div>

        </div>
      </React.StrictMode>
    </div>
  )
}


