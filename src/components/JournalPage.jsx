import React, { Fragment } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import {
  Link,
  Redirect,
  Route,
  Switch,
  NavLink as RouterNavLink
} from "react-router-dom";
import Util from "../util/Util";
import JournalPageMap from "./JournalPageMap";
import Gallery from "./Gallery";
import parser, { BBCodeContext } from "../util/BBCodeParser";
import { inject, observer } from "mobx-react";
import RequestStateLoader from "./loader/RequestStateLoader";
import { DateTime } from "luxon";

export const JournalPageModules = {
  JOURNAL: 1,
  GALLERY: 2,
  MAP: 3
};

@observer
class JournalPage extends React.Component {
  scrollContainer = null;

  componentWillMount = () => {
    this.props.journey.loadPage(this.props.pageSlug);
  };

  componentWillUpdate = (nextProps) => {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      nextProps.journey.loadPage(nextProps.pageSlug);

      if (this.scrollContainer) {
        this.scrollContainer.scrollTop = 0;
      }
    }
  };

  getTabs = () => {
    const { mapLocationStore } = this.props;

    return [
      {
        moduleId: JournalPageModules.JOURNAL,
        text: "Journal",
        id: "journal",
        content: (journey, page) => (
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
        )
      },
      {
        moduleId: JournalPageModules.GALLERY,
        text: "Gallery",
        id: "gallery",
        content: (journey, page) => (
          <Gallery query={this.getGalleryQuery(journey, page)} />
        )
      },
      {
        moduleId: JournalPageModules.MAP,
        text: "Map",
        id: "map",
        content: (journey, page) => {
          return <JournalPageMap locations={page.uniqueVisitedLocations} />;
        }
      }
    ];
  };

  getGalleryQuery = (journey, page) => {
    const query = {
      journey: journey.slug
    };

    if (page.dateStart) {
      query.after = page.dateStart;
    }

    if (page.dateEnd) {
      query.before = page.dateEnd;
    } else if (page.dateStart) {
      query.before = DateTime.fromISO(page.dateStart)
        .plus({ days: 1 })
        .toISO();
    }

    return query;
  };

  render() {
    const { journey, match, location, pageSlug } = this.props;
    const page = journey.getPage(pageSlug);

    const displayName = `${journey.name} – ${
      page ? page.displayName : pageSlug
    }`;
    const activePage = Util.getNextPathElement(location, match);

    const enabledTabs = this.getTabs().filter(
      (tab) => page.disabledModules.indexOf(tab.moduleId) === -1
    );

    return (
      <div className="JournalPage">
        <h2
          className={`JournalPage__title JournalPage__title--${activePage}`}
          style={{
            backgroundImage: journey.background
              ? `url(${journey.background})`
              : null
          }}
        >
          {displayName}
        </h2>
        <RequestStateLoader
          state={journey.pageRequestStatuses.get(pageSlug)}
          loaded={() => (
            <Fragment>
              <div className="JournalPage__nav">
                <Nav tabs>
                  {enabledTabs.map((tab) => (
                    <NavItem key={tab.id}>
                      <NavLink
                        tag={RouterNavLink}
                        to={`${match.url}/${tab.id}`}
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
                  {enabledTabs.map((tab) => (
                    <Route
                      path={`${match.url}/${tab.id}`}
                      render={() => tab.content(journey, page)}
                      key={tab.moduleId}
                    />
                  ))}
                  <Redirect
                    path={`${match.url}`}
                    to={`${match.url}/${enabledTabs[0].id}`}
                  />
                </Switch>
              </div>
            </Fragment>
          )}
        />
      </div>
    );
  }
}

export default inject("mapLocationStore")(JournalPage);
