import { useState } from 'react';
import * as React from 'react';
import Image from 'next/image'
import Router, { useRouter } from 'next/router';
import Modal_window from './modal';
import 'bootstrap/dist/css/bootstrap.css';
import github from "../../img/github.png";
import linkedin from "../../img/linkedin.png";
export function Navbar(props: any) {
  const router = useRouter()
  return (
    <nav className="navbar-perso">
      {/* <ul className="navbar-icone-perso">
        <li >
          <a style={{ margin: "auto", top: "50%", bottom: "50%" }} href="https://github.com/amapic/my-app/tree/branche_principale">
            <Image
              width={40}
              height={40}
              src={github} />
          </a>

          <a style={{ margin: "auto", top: "50%", bottom: "50%" }} href="https://github.com/amapic/my-app/tree/branche_principale">
            <Image
              width={30}
              height={30}
              src={linkedin} />
          </a>
        </li>
      </ul> */}
      <ul className="navbar-nav-perso">{props.children}</ul>
    </nav>
  );
}

// export default function Lien(props: any) {
//   const router = useRouter()
//   // console.log(router.pathname);
//   return (
//     <>
//       {
//         router.pathname === '/planet' ?

//           <span className='navtext' onClick={() => Router.push('/')} > ◄  Suivi de campagne vaccinatoire</span>
//           :

//           <span className='navtext' onClick={() => Router.push('/planet')} > ◄  Dashboard exoplanète</span>

//       }</>)
// }

export function NavItem(props: any) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    console.log(open);
    setOpen(!open);
  }

  let hover: string = ""
  let hover_planet: string = ""
  hover_planet = router.pathname === '/planet' ? "nav-item noselect nav_item_selected" : "nav-item noselect"
  hover = router.pathname === '/planet' ? "nav-item noselect" : "nav-item noselectt nav_item_selected"
  return (
    <>


      <li className={hover_planet}>
        <span className="navtext" onClick={() => Router.push('/planet')}>Dashboard Exoplanète</span>
      </li>
      <li className={hover}>
        <span className="navtext" onClick={() => Router.push('/')}>Suivi campagne de vaccination</span>
      </li>



      <li className={hover}>
        <span className="navtext" onClick={() => Router.push('/detail_dev')}>Temps de développement</span>
      </li>

      {/* <li className="nav-item noselect">

        <a href="#" onClick={handleOpen}>

          <span className='navtext'>Temps de développement</span>
        </a>

        <Modal_window
          show={open}
          onHide={handleClose}
        />
      </li> */}

    </>
  );
}



