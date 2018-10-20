import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Helmet } from "react-helmet";

import JourneyNavbar from "./JourneyNavbar";
import Util from "../util/Util";
import JournalPage from "./JournalPage";
import JournalPagesList from "./JournalPagesList";
import JournalOverviewPage from "./JournalOverviewPage";
import PhotoModal from "./PhotoModal";

@observer
class JourneyView extends React.Component {
  render() {
    const journey = this.props.journeyStore.findJourney(
      this.props.match.params.id
    );

    return (
      <div className="JourneyView__container">
        <Helmet>
          <title>{journey.name} – JourneyLog</title>
        </Helmet>
        <JourneyNavbar journey={journey} />
        <Container className="JourneyView">
          <div className="JourneyView__inner border">
            {!journey ? (
              <Row>
                <Col xs="12">
                  This journey doesn't exist.{" "}
                  <Link to="/">Return to listing</Link>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col xs="12" md="3" className="d-none d-md-block">
                  <JournalPagesList
                    journey={journey}
                    activePage={Util.getNextPathElement(
                      this.props.location,
                      this.props.match
                    )}
                  />
                </Col>
                <Col xs="12" md="9">
                  <Switch>
                    <Route
                      path={`${this.props.match.url}/overview`}
                      render={({ match, location }) => (
                        <JournalOverviewPage
                          journey={journey}
                          match={match}
                          location={location}
                        />
                      )}
                    />
                    <Route
                      path={`${this.props.match.url}/:slug`}
                      render={({ match, location }) => {
                        const page = journey.findPage(match.params.slug);

                        return (
                          <JournalPage
                            journey={journey}
                            page={page}
                            match={match}
                            location={location}
                          />
                        );
                      }}
                    />
                    <Redirect
                      path={this.props.match.url}
                      to={`${this.props.match.url}/overview`}
                    />
                  </Switch>
                </Col>
              </Row>
            )}
          </div>
        </Container>
        <PhotoModal journey={journey} />
      </div>
    );
  }
}

export default inject("journeyStore")(JourneyView);
