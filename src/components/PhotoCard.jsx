import React from "react";
import { Card } from "reactstrap";

class PhotoCard extends React.PureComponent {
  render() {
    if (!this.props.photo) {
      return null;
    }

    return <Card className="PhotoCard">{this.props.photo.name}</Card>;
  }
}

export default PhotoCard;
