
// import { ReactComponent as BellIcon } from './icons/bell.svg';
// import { ReactComponent as MessengerIcon } from './icons/messenger.svg';

// import { ReactComponent as PlusIcon } from './icons/plus.svg';
// import { ReactComponent as CogIcon } from './icons/cog.svg';
// import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
// import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
// import { ReactComponent as BoltIcon } from './icons/bolt.svg';

import React, { useState, useEffect, useRef } from 'react';


export function Navbar(props) {
  return (
    <nav className="navbar-perso">
      <ul className="navbar-nav-perso">{props.children}</ul>
    </nav>
  );
}

Navbar.name === "ArrowFn"

export function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => {
        setOpen(!open)
      }}>
        {!open && <svg viewBox="0 0 320 512"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" class="" ></path></svg>
        }
        {open && <svg viewBox="0 0 320 512">
          <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" class="" transform="rotate(180,160,256)" ></path>
          </svg>
        }
      </a>

      <DropdownMenu visible={open}></DropdownMenu>
    </li>
  );
}

export function DropdownMenu(props) {
  const dropdownRef = useRef(null);
  let menuHeight = props.visible ? 200 : 0
  let visible = props.visible ? "visible" : "hidden"
  let displaytext = props.visible ? "inline" : "none"
  console.log("visible", props.visible)
  console.log("height", menuHeight)


  const style = {
    color: 'black'
  };
  console.log(menuHeight);
  return (
    <div id="dropd" style={{ height: menuHeight, backgroundColor: '#484a4d', transition: "all 500ms ease-out" }} ref={dropdownRef}>

      <span id="resume" style={{ position: 'absolute', top: menuHeight - 30, color: 'white', visibility: visible, transition: "top 500ms,visibility 500ms linear 500ms" }}>
        ggggggggggggggsg
        <br />
        sfxfhsfh
        <br />
        sfhsfhsfh
        <br />
        sfhsfh
      </span>

    </div>

  );
}

// export default App;
