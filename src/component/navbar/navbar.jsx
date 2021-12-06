
// import { ReactComponent as BellIcon } from './icons/bell.svg';
// import { ReactComponent as MessengerIcon } from './icons/messenger.svg';

// import { ReactComponent as PlusIcon } from './icons/plus.svg';
// import { ReactComponent as CogIcon } from './icons/cog.svg';
// import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
// import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
// import { ReactComponent as BoltIcon } from './icons/bolt.svg';

import React, { useState, useEffect, useRef } from 'react';

// function App() {
//   return (
//     <Navbar>
//       <NavItem icon_up={<CaretIcon_up />} icon_down={<CaretIcon_down />}>
//       </NavItem>
//     </Navbar>
//   );
// }

export function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

export function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => {
        setOpen(!open)
      }}>
        {!open && props.icon_down}
        {open && props.icon_down}
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

      <span id="resume" style={{ position: 'absolute',top: menuHeight - 30, color: 'white', visibility: visible, transition: "top 500ms,visibility 500ms linear 500ms" }}>
        ggggggggggggggsg
        <br/>
        sfxfhsfh
        <br/>
        sfhsfhsfh
        <br/>
        sfhsfh
        </span>

    </div>

  );
}

// export default App;
