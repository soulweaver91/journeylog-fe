import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class JournalPagesList extends React.Component {
  render() {
    return (
      <div className="JournalPagesList">
        <ListGroup>
          <ListGroupItem
            key="_overview"
            tag={RouterNavLink}
            to={`${this.props.journey.route}/overview`}
          >
            Overview
          </ListGroupItem>
          {this.props.journey.journalPages.map((page) => (
            <ListGroupItem key={page.slug} tag={RouterNavLink} to={page.route}>
              <span className="JournalPagesList__page-name">
                {page.displayName}
              </span>
              {page.photosCount > 0 && (
                <span className="JournalPagesList__page-indicator">
                  <FontAwesomeIcon icon="image" /> {page.photosCount}
                </span>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default JournalPagesList;
