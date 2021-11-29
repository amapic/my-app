import React, { useEffect, useState } from 'react';
import { Graph_annee, Graph_masse_distance, Graph_zone_habitable, Taille_planete, Graph_semi_major_moyen, Graph_rayon_moyen } from '../component_planet/graph_planet';
import 'bootstrap/dist/css/bootstrap.css';


// import fetch from 'node-fetch'



export default function Dashboard() {


  return (

    <div className="wrapper">
      <nav id="sidebar">
        AAAA
      </nav>
      <div id="content">
        <nav className="navbar navbar-transparent navbar-expand-md navbar-dark bg-dark justify-content-center mb-4">
          <div className="container-fluid-nav">
            <a className="navbar-brand" href="#">Exoplanètes</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              {/* <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <form className="form-inline mt-2 mt-md-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
            </div>
          </div>
        </nav>
        <header className="page-header header container-fluid">
          {/* AHAH */}
        </header>
        <div className="container border border-dark rounded features">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <h3 className="feature-title">Lorem ipsum</h3>
              {/* <img src="images/column-1.jpg" className="img-fluid"> */}
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum quam odio, quis placerat ante luctus eu. Sed aliquet dolor id sapien rutrum, id vulputate quam iaculis.</p>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12">
              <h3 className="feature-title">Lorem ipsum</h3>
              {/* <img src="images/column-2.jpg" className="img-fluid"> */}
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum quam odio, quis placerat ante luctus eu. Sed aliquet dolor id sapien rutrum, id vulputate quam iaculis.</p>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12">

            </div>
          </div>
        </div>
        
        <div className="container features mt-2">
          <div className="row gx-2">
            <div className="col-10">
              <div className="border border-dark rounded p-3">
                <h3 className="feature-title">Lorem ipsum</h3>
                {/* <img src="images/column-1.jpg" className="img-fluid"> */}
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum quam odio, quis placerat ante luctus eu. Sed aliquet dolor id sapien rutrum, id vulputate quam iaculis.</p>
                <Graph_semi_major_moyen />
                {/* <Graph_rayon_moyen /> */}
                <Graph_masse_distance />
                {/* <Graph_annee /> */}
                {/* <Graph_zone_habitable/> */}
                {/* <Taille_planete /> */}
              </div>
            </div>

            <div className="col-2">
              <div className="border border-dark rounded p-3">
                <h3 className="feature-title">Lorem ipsum</h3>
                {/* <img src="images/column-2.jpg" className="img-fluid"> */}
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum quam odio, quis placerat ante luctus eu. Sed aliquet dolor id sapien rutrum, id vulputate quam iaculis.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


