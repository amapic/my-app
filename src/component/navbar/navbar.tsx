
import { VisibilityProperty } from 'csstype';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import CaretIcon_up from '../../img/icons/caret_up.svg';
import CaretIcon_down from '../../img/icons/caret_down.svg';
import Router, { useRouter } from 'next/router';

export function Navbar(props: any) {
  const router = useRouter()
  return (
    <nav className="navbar-perso">
      <ul className="navbar-nav-perso">{props.children}</ul>
      {/* <div className='titre'>
        {router.pathname === '/planet' ? <span className='navtext'>Dashboard Exoplanète</span> : <span className='navtext'>Suivi campagne de vaccination</span>}
      </div> */}
    </nav>
  );
}

export default function Lien() {
  // Calling useRouter() hook
  const router = useRouter()
  console.log(router.pathname);
  if (router.pathname === '/planet') {
    return (
      <span className='navtext' onClick={() => Router.push('/')} > ◄  Suivi de campagne vaccinatoire</span>
    )
  } else {
    return (
      <span className='navtext' onClick={() => Router.push('/planet')} > ◄  Dashboard exoplanète</span>
    )
  }


}

export function NavItem(props: any) {
  const [open, setOpen] = useState(false);
  const router = useRouter()

  return (
    <>
      <li className="nav-item nav-item-link">
        <Lien />
      </li>
      <li className="nav-item">
        {router.pathname === '/planet' ? <span className='navtext'>Dashboard Exoplanète</span> : <span className='navtext'>Suivi campagne de vaccination</span>}
      </li>
      <li className="nav-item">
        <a href="#" className="icon-button" onClick={() => {
          setOpen(!open)
        }}>
          {open && <Image
            width="100%"
            height="100%"
            src={CaretIcon_up} />}
          {!open && <Image
            width="100%"
            height="100%"
            src={CaretIcon_down} />}
        </a>

        <DropdownMenu visible={open}></DropdownMenu>
      </li>

    </>
  );
}

export function DropdownMenu(props: any) {
  const dropdownRef = useRef(null);
  let menuHeight = props.visible ? 200 : 0
  let visible: VisibilityProperty = props.visible ? "visible" : "hidden"
  console.log("visible", props.visible)
  console.log("height", menuHeight)

  const router = useRouter()

  // if (router.pathname === '/planet') {
  return (
    <div id="dropd" style={{ height: menuHeight, backgroundColor: '#484a4d', transition: "all 500ms ease-out" }} ref={dropdownRef}>

      <span id="resume" style={{ zIndex: 7, position: 'absolute', top: menuHeight - 80, color: 'white', visibility: visible, transition: "top 500ms,visibility 500ms linear 500ms" }}>
        ○ Partie React de la page réalisée en 2 jours
        <br></br>
        ○ Réalisation des graphiques et des svg en 2 jours
        <br></br>
        ○  Récupération / analyse des données en 1 jour
        <br></br>
        ○  Mise en place API en 1/2 journée
      </span>

    </div>

  );
  // }
}

