import React from "react";
import { observer } from "mobx-react";
import RequestState from "../../stores/util/RequestState";
import DefaultSpinner from "./DefaultSpinner";

@observer
class RequestStateLoader extends React.Component {
  render() {
    const { state, loaded } = this.props;

    switch (state) {
      case RequestState.ERROR:
        return (
          <div className="RequestStateLoader__loading">
            An error occurred while loading this content.
          </div>
        );
      case RequestState.LOADED:
        return loaded ? loaded() : null;
      case RequestState.LOADING:
      default:
        return (
          <div className="RequestStateLoader__loading">
            <DefaultSpinner />
          </div>
        );
    }
  }
}

export default RequestStateLoader;
