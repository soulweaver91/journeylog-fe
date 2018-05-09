import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {Link} from "react-router-dom";
import classNames from 'classnames';

class JournalPagesList extends React.Component {
  render() {
    return (
      <div className="JournalPagesList">
        <ListGroup>
          <ListGroupItem key="_overview" tag={Link} to={`${this.props.journey.route}/overview`} className={classNames({
            active: this.props.activePage === "overview"
          })}>
            Overview
          </ListGroupItem>
          {this.props.journey.journal.map((page) => (
            <ListGroupItem key={page.date} tag={Link} to={page.route} className={classNames({
              active: this.props.activePage === page.date
            })}>
              {page.date}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default JournalPagesList;
