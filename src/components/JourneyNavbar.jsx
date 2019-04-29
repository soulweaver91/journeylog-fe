import React from "react";
import { Navbar, NavItem, Nav, Button } from "reactstrap";
import { inject, observer } from "mobx-react";
import NavbarBrandItem from "./NavbarBrandItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index.es";

@inject("aboutModalStore")
@observer
class JourneyNavbar extends React.Component {
  render() {
    return (
      <Navbar color="dark" dark expand="xs">
        <Nav navbar>
          <NavbarBrandItem />
          <NavItem>
            <span>
              <FontAwesomeIcon icon="chevron-right" />
              {this.props.journey ? this.props.journey.name : "???"}
            </span>
          </NavItem>
        </Nav>
        <Nav navbar className="ml-auto">
          <NavItem>
            <Button color="link" onClick={this.props.aboutModalStore.open}>
              About
            </Button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default JourneyNavbar;
