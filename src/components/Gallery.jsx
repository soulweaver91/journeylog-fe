import React from "react";
import { Card, Input, Label } from "reactstrap";
import PhotoCard from "./PhotoCard";

class Gallery extends React.Component {
  render() {
    return (
      <div className="Gallery">
        <Label>
          Filter:
          <Input />
        </Label>

        <div className="Gallery__photos">
          {this.props.photos.map((photo) => (
            <PhotoCard key={photo.name} photo={photo} />
          ))}
        </div>
      </div>
    );
  }
}

export default Gallery;
