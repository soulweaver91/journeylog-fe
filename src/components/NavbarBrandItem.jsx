import React from "react";
import { NavItem, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";

class NavbarBrandItem extends React.PureComponent {
  render() {
    return (
      <NavItem>
        <NavbarBrand tag={Link} to="/">
          JourneyLog
        </NavbarBrand>
      </NavItem>
    );
  }
}

export default NavbarBrandItem;
