import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Helmet } from "react-helmet";

import FrontPageNavbar from "./FrontPageNavbar";
import JourneyList from "./JourneyList";

class FrontPageView extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Journeys – JourneyLog</title>
        </Helmet>
        <FrontPageNavbar />
        <Container className="FrontPageView">
          <Row>
            <Col xs="12">
              <h1>All journeys</h1>

              <JourneyList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FrontPageView;
