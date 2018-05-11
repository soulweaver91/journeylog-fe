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
        <Container>
          <Row>
            <Col xs="12">
              <p className="center">Please select a journey below.</p>

              <JourneyList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FrontPageView;
