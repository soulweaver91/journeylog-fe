import React from 'react';
import {Col, Container, Row} from "reactstrap";
import {Route} from "react-router-dom";

import JourneyList from "./JourneyList";
import JourneyView from "./JourneyView";

class JourneyLog extends React.Component {
	render() {
		return <div>
      <Route exact path="/" render={() => (
        <Container>
          <Row>
            <Col xs="12" md="3">
              <JourneyList />
            </Col>
            <Col xs="12" md="9">
              nothing
            </Col>
          </Row>
        </Container>
      )} />
      <Route path="/journey/:id" component={JourneyView} />
		</div>;
	}
}

export default JourneyLog;
