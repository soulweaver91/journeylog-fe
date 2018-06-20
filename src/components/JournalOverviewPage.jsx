import React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import classNames from "classnames";
import { Nav, NavItem, NavLink } from "reactstrap";
import Util from "../util/Util";
import Gallery from "./Gallery";
import JournalPageMap from "./JournalPageMap";
import { liteParser } from "../util/BBCodeParser";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

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

          <ul className="JournalPage__key-points">
            <li title={journey.photos.length + " photos taken"}>
              <FontAwesomeIcon icon="images" />
              <span>{journey.photos.length}</span>
              <span className="sr-only"> photos</span>
            </li>
            <li title={journey.journal.length + " journal pages written"}>
              <FontAwesomeIcon icon="book" />
              <span>{journey.journal.length}</span>
              <span className="sr-only"> journal pages</span>
            </li>
            {/* <li title={journey.map_locations.length + " locations visited"}>
              <FontAwesomeIcon icon="map-pin" />
              <span>{journey.map_locations.length}</span>
              <span className="sr-only"> visited locations</span>
            </li>
            <li title={journey.map_route.length + " points in timeline"}>
              <FontAwesomeIcon icon="route" />
              <span>{journey.map_route.length}</span>
              <span className="sr-only"> map timeline points</span>
            </li> */}
          </ul>
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
                  {/* TODO: hack */}
                  <p>
                    {liteParser.toReact(
                      "[root]" + journey.description + "[/root]"
                    )}
                  </p>
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
