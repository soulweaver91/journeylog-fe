import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";

class JournalPagesList extends React.Component {
  render() {
    return (
      <div className="JournalPagesList">
        <ListGroup>
          <ListGroupItem
            key="_overview"
            tag={NavLink}
            to={`${this.props.journey.route}/overview`}
          >
            Overview
          </ListGroupItem>
          {this.props.journey.journalPages.map((page) => (
            <ListGroupItem key={page.slug} tag={NavLink} to={page.route}>
              {page.displayName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default JournalPagesList;
