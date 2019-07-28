import React from "react";
import MenuItem from "./menu-item";
import { Consumer } from "../../contexts/locale";

function Menu({ children }) {
  return (
    <div>
      <h1>
        <Consumer>{translations => translations.applicationName}</Consumer>
      </h1>
      {children}
    </div>
  );
}

Menu.propTypes = {};

Menu.Item = MenuItem;

export { MenuItem };
export default Menu;
