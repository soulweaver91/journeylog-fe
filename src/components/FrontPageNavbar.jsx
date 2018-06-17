import React from "react";
import { Navbar, Nav, Button } from "reactstrap";
import { inject, observer } from "mobx-react";
import NavbarBrandItem from "./NavbarBrandItem";

@inject("aboutModalStore")
@observer
class JourneyNavbar extends React.Component {
  render() {
    return (
      <Navbar color="dark" dark expand="xs">
        <Nav navbar>
          <NavbarBrandItem />
        </Nav>
        <Nav navbar className="ml-auto">
          <Button color="link" onClick={this.props.aboutModalStore.open}>
            About
          </Button>
        </Nav>
      </Navbar>
    );
  }
}

export default JourneyNavbar;
