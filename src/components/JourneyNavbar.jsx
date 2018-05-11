import React from 'react';
import {Navbar, NavItem, NavLink, Nav} from "reactstrap";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";

@observer
class JourneyNavbar extends React.Component {
  render() {
    return <Navbar color="dark" dark expand="xs">
      <Nav navbar>
        <NavItem>
          <NavLink tag={Link} to="/">Back</NavLink>
        </NavItem>
        <NavItem>
          <span>
            Journey: {this.props.journey.name || "???"}
          </span>
        </NavItem>
      </Nav>
    </Navbar>;
  }
}

export default JourneyNavbar;