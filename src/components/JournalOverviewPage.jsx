import React from "react";
import {
  Redirect,
  Route,
  Switch,
  NavLink as RouterNavLink
} from "react-router-dom";
import { Nav, NavItem, NavLink, Collapse } from "reactstrap";
import Util from "../util/Util";
import Gallery from "./Gallery";
import JournalPageMap from "./JournalPageMap";
import { liteParser } from "../util/BBCodeParser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UI_BREAKPOINTS } from "../util/Media";
import JournalPagesList from "./JournalPagesList";
import { observer } from "mobx-react";

@observer
class JournalOverviewPage extends React.Component {
  state = {
    mobilePagesCollapseOpen: false
  };

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

  toggleMobilePagesCollapse = () => {
    this.setState((state) => ({
      ...state,
      mobilePagesCollapseOpen: !state.mobilePagesCollapseOpen
    }));
  };

  render() {
    const { journey } = this.props;
    const activePage = Util.getNextPathElement(
      this.props.location,
      this.props.match
    );

    return (
      <div className={`JournalPage JournalPage--${activePage}`}>
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
            <li title={journey.photosCount + " photos taken"}>
              <FontAwesomeIcon icon="images" />
              <span>{journey.photosCount}</span>
              <span className="sr-only"> photos</span>
            </li>
            <li title={journey.journalPagesCount + " journal pages written"}>
              <FontAwesomeIcon icon="book" />
              <span>{journey.journalPagesCount}</span>
              <span className="sr-only"> journal pages</span>
            </li>
            <li
              title={
                journey.uniqueVisitedLocations.length + " locations visited"
              }
            >
              <FontAwesomeIcon icon="map-pin" />
              <span>{journey.uniqueVisitedLocations.length}</span>
              <span className="sr-only"> visited locations</span>
            </li>
            {/* <li title={journey.map_route.length + " points in timeline"}>
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
                  tag={RouterNavLink}
                  to={`${this.props.match.url}/${tab.id}`}
                >
                  {tab.text}
                </NavLink>
              </NavItem>
            ))}
            {UI_BREAKPOINTS.xs && (
              <NavItem className="JournalOverviewPage__mobile-page-toggler">
                <NavLink href="#" onClick={this.toggleMobilePagesCollapse}>
                  <FontAwesomeIcon icon="bars" /> Pages{" "}
                  <FontAwesomeIcon
                    icon={
                      this.state.mobilePagesCollapseOpen
                        ? "caret-up"
                        : "caret-down"
                    }
                  />
                </NavLink>
              </NavItem>
            )}
          </Nav>
          {UI_BREAKPOINTS.xs && (
            <Collapse
              className="JournalOverviewPage__mobile-pages-list"
              isOpen={this.state.mobilePagesCollapseOpen}
            >
              <JournalPagesList journey={journey} />
            </Collapse>
          )}
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
              render={() => (
                <Gallery
                  query={{
                    journey: journey.slug
                  }}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/map`}
              render={() => (
                <JournalPageMap locations={journey.uniqueVisitedLocations} />
              )}
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
