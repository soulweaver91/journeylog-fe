import React from 'react';
import {Col, Container, Row} from "reactstrap";

import FrontPageNavbar from "./FrontPageNavbar";
import JourneyList from "./JourneyList";

class FrontPageView extends React.Component {
	render() {

		return <div>
      <FrontPageNavbar />
      <Container>
        <Row>
          <Col xs="12">
            <p className="center">
              Please select a journey below.
            </p>

            <JourneyList />
          </Col>
        </Row>
      </Container>
    </div>;
	}
}

export default FrontPageView;
