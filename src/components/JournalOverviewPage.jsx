import React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import classNames from "classnames";
import { Nav, NavItem, NavLink } from "reactstrap";
import Util from "../util/Util";
import Gallery from "./Gallery";
import JournalPageMap from "./JournalPageMap";

class JournalOverviewPage extends React.Component {
  tabs = [
    {
      text: "Journal",
      id: "journal"
    },
    {
      text: "Gallery",
      id: "gallery"
    },
    {
      text: "Map",
      id: "map"
    }
  ];

  render() {
    const { journey } = this.props;
    const activePage = Util.getNextPathElement(
      this.props.location,
      this.props.match
    );

    return (
      <div className="JournalPage">
        <h2
          className="JournalPage__title JournalPage__overview-title"
          style={{
            backgroundImage: journey.background
              ? `url(${journey.background})`
              : null
          }}
        >
          {journey.name}
        </h2>
        <div className="JournalPage__nav">
          <Nav tabs>
            {this.tabs.map((tab) => (
              <NavItem key={tab.id}>
                <NavLink
                  tag={Link}
                  to={`${this.props.match.url}/${tab.id}`}
                  className={classNames({
                    active: activePage === tab.id
                  })}
                >
                  {tab.text}
                </NavLink>
              </NavItem>
            ))}
            <NavItem>
              <div className="d-md-none">TODO mobile navigation</div>
            </NavItem>
          </Nav>
        </div>
        <div className="JournalPage__content">
          <Switch>
            <Route
              path={`${this.props.match.url}/journal`}
              render={() => (
                <div>
                  <p>{journey.description}</p>
                  <ul>
                    <li>{journey.photos.length} photos</li>
                    <li>{journey.map_locations.length} map location visits</li>
                    <li>{journey.map_route.length} map timeline points</li>
                    <li>{journey.journal.length} journal pages</li>
                  </ul>
                </div>
              )}
            />
            <Route
              path={`${this.props.match.url}/gallery`}
              render={() => <Gallery photos={journey.photos} />}
            />
            <Route
              path={`${this.props.match.url}/map`}
              render={() => <JournalPageMap />}
            />
            <Redirect
              path={`${this.props.match.url}`}
              to={`${this.props.match.url}/journal`}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default JournalOverviewPage;
