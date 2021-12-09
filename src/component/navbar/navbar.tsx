
import { VisibilityProperty } from 'csstype';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import CaretIcon_up  from '../../img/icons/caret_up.svg';
import CaretIcon_down from '../../img/icons/caret_down.svg';
// import { ReactComponent as BellIcon } from './icons/bell.svg';
// import { ReactComponent as MessengerIcon } from './icons/messenger.svg';

// import { ReactComponent as PlusIcon } from './icons/plus.svg';
// import { ReactComponent as CogIcon } from './icons/cog.svg';
// import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
// import { ReactComponent as ArrowIcon } from './icons/arrow.svg';




// declare module '*.svg' {
//   // import React = require('react');
//   export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//   const src: string;
//   // export default src;
// }


export function Navbar(props:any) {
  return (
    <nav className="navbar-perso">
      <ul className="navbar-nav-perso">{props.children}</ul>
    </nav>
  );
}

Navbar.name === "ArrowFn"

export function NavItem(props:any) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => {
        setOpen(!open)
      }}>
        {open&&<Image
        width="100%"
        height="100%"
        src={CaretIcon_up}/>}
        {!open&&<Image
        width="100%"
        height="100%"
        src={CaretIcon_down}/>}
      </a>

      <DropdownMenu visible={open}></DropdownMenu>
    </li>
  );
}

export function DropdownMenu(props:any) {
  const dropdownRef = useRef(null);
  let menuHeight = props.visible ? 200 : 0
  let visible:VisibilityProperty = props.visible ? "visible" : "hidden"
  let displaytext = props.visible ? "inline" : "none"
  console.log("visible", props.visible)
  console.log("height", menuHeight)


  const style:{} = {
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
