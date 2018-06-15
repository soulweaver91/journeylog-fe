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
          href={photoModalStore.getHash(photo)}
          onClick={(e) => {
            e.preventDefault();
            photoModalStore.open(photo);
          }}
          style={{
            width: size || undefined
          }}
        >
          <div
            className="PhotoCard__img-container"
            style={{
              backgroundImage: `url(${photo.thumbUrl})`,
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
