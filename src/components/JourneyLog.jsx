import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import JourneyView from "./JourneyView";
import FrontPageView from "./FrontPageView";

class JourneyLog extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/journey/:id" component={JourneyView} />
        <Route exact path="/" component={FrontPageView} />
        <Redirect path="/" to="/" />
      </Switch>
    );
  }
}

export default JourneyLog;
