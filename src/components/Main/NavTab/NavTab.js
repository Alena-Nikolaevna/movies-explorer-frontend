import React from "react";
import "./NavTab.css";

function NavTab() {
  return (

    <nav className="navtab">

      <button className="navtab__button" type="button">
        <a className="navtab__link" href="#aboutproject">Узнать больше</a>
      </button>

    </nav>
  );
}

export default NavTab;