import React from "react";
import classNames from "classnames";

class Banner extends React.Component {
  render() {
    return (
      <div className={classNames("Banner", this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}

export default Banner;
