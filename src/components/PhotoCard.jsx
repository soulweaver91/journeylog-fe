import React from "react";
import { Card } from "reactstrap";
import { inject } from "mobx-react";

@inject("photoModalStore")
class PhotoCard extends React.PureComponent {
  render() {
    const { photo, photoModalStore, size } = this.props;

    if (!photo) {
      return null;
    }

    return (
      <Card className="PhotoCard">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            photoModalStore.open(photo);
          }}
          style={{
            width: size || undefined
          }}
        >
          {/* TODO */}
          <div
            className="PhotoCard__img-container"
            style={{
              backgroundImage: `url(http://home.soulweaver.fi/japan18/th/${photo.filename.replace(
                /.jpg/i,
                ".th.jpg"
              )})`,
              width: size || undefined,
              height: size || undefined
            }}
          />
          <div className="PhotoCard__data-container">
            <span>{photo.name}</span>
          </div>
        </a>
      </Card>
    );
  }
}

export default PhotoCard;
