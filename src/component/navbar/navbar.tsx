import React, { useState} from 'react';
import Image from 'next/image'
// import CaretIcon_up from '/../../img/icons/caret_up.svg';
// import CaretIcon_down from '/../../img/icons/caret_down.svg';
import Router, { useRouter } from 'next/router';
import Modal_window from './modal';

export function Navbar(props: any) {
  const router = useRouter()
  return (
    <nav className="navbar-perso">
      <ul className="navbar-nav-perso">{props.children}</ul>
    </nav>
  );
}

export default function Lien() {
  // Calling useRouter() hook
  const router = useRouter()
  // console.log(router.pathname);
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
  const [open, setOpen] = React.useState(false);
  const router = useRouter()

  const handleClose=()=> {
    setOpen(false)
  }

  return (
    <>
      <li className="nav-item noselect nav-item-link">
        <Lien />
      </li>
      <li className="nav-item noselect">
        {router.pathname === '/planet' ? <span className='navtext'>Dashboard Exoplanète</span> : <span className='navtext'>Suivi campagne de vaccination</span>}
      </li>
      <li className="nav-item noselect">
        <a href="#" className="icon-button" onClick={() => {
          setOpen(!open);
        }}>aa
          {/* {open && <Image
            width="100%"
            height="100%"
            src='/../../img/icons/caret_down.svg' />}
          {!open && <Image
            width="100%"
            height="100%"
            src='/../../img/icons/caret_down.svg' />} */}
        </a>
        <Modal_window
        show={open}
        onHide={handleClose}
        />
      </li>

    </>
  );
}



