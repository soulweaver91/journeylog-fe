import React from "react";
import { Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class JournalPageMap extends React.Component {
  render() {
    return (
      <div className="JournalPageMap">
        <Alert color="warning">
          <FontAwesomeIcon icon="exclamation-triangle" /> This feature has not
          been implemented yet, but it will be added in the future.
        </Alert>
      </div>
    );
  }
}

export default JournalPageMap;
