import React from "react";
import { Navbar, NavItem, NavLink, Nav, Button } from "reactstrap";
import { Link } from "react-router-dom";
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
          <NavItem>
            <NavLink tag={Link} to="/">
              Back
            </NavLink>
          </NavItem>
          <NavItem>
            <span>Journey: {this.props.journey.name || "???"}</span>
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
