import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import classNames from "classnames";
import Util from "../util/Util";
import JournalPageMap from "./JournalPageMap";
import Gallery from "./Gallery";
import parser, { BBCodeContext } from "../util/BBCodeParser";
import { inject } from "mobx-react";

class JournalPage extends React.Component {
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

  scrollContainer = null;

  componentWillUpdate = (nextProps) => {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.scrollContainer.scrollTop = 0;
    }
  };

  render() {
    const { journey, match, location, page, mapLocationStore } = this.props;

    const activePage = Util.getNextPathElement(location, match);

    return (
      <div className="JournalPage">
        <h2
          className="JournalPage__title"
          style={{
            backgroundImage: journey.background
              ? `url(${journey.background})`
              : null
          }}
        >
          {journey.name} – {page.displayName}
        </h2>
        <div className="JournalPage__nav">
          <Nav tabs>
            {this.tabs.map((tab) => (
              <NavItem key={tab.id}>
                <NavLink
                  tag={Link}
                  to={`${match.url}/${tab.id}`}
                  className={classNames({
                    active: activePage === tab.id
                  })}
                >
                  {tab.text}
                </NavLink>
              </NavItem>
            ))}
            <NavItem className="d-md-none ml-auto">
              <NavLink tag={Link} to={`${journey.route}`}>
                Back
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div
          className="JournalPage__content"
          ref={(el) => (this.scrollContainer = el)}
        >
          <Switch>
            <Route
              path={`${match.url}/journal`}
              render={() => (
                <div>
                  <BBCodeContext.Provider
                    value={{
                      journey,
                      page,
                      mapLocationStore
                    }}
                  >
                    {parser.toReact(page.text)}
                  </BBCodeContext.Provider>
                </div>
              )}
            />
            <Route
              path={`${match.url}/gallery`}
              render={() => <Gallery photos={page.photos} />}
            />
            <Route
              path={`${match.url}/map`}
              render={() => <JournalPageMap />}
            />
            <Redirect path={`${match.url}`} to={`${match.url}/journal`} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default inject("mapLocationStore")(JournalPage);
