import React from 'react';
import {Navbar, Nav} from "reactstrap";
import {observer} from "mobx-react";
import NavbarBrandItem from "./NavbarBrandItem";

@observer
class JourneyNavbar extends React.Component {
  render() {
    return <Navbar color="dark" dark expand="xs">
      <Nav navbar>
        <NavbarBrandItem />
      </Nav>
    </Navbar>;
  }
}

export default JourneyNavbar;
