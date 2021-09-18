import React from "react";
import { Card } from "reactstrap";
import { inject, observer } from "mobx-react";
import LazyLoad from "react-lazyload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UI_BREAKPOINTS } from "../util/Media";

@inject("photoModalStore")
@observer
class PhotoCard extends React.Component {
  render() {
    const { photo, photoModalStore, size, context } = this.props;

    if (!photo) {
      return null;
    }

    return (
      <Card className="PhotoCard">
        <a
          href={photoModalStore.getHash(photo.journeySlug, photo.filename)}
          onClick={(e) => {
            e.preventDefault();
            photoModalStore.open(photo.journeySlug, photo.filename, {
              context
            });
          }}
          style={{
            width: size || undefined
          }}
        >
          <LazyLoad
            height={size || 200}
            overflow={UI_BREAKPOINTS.noScroll}
            offset={size * 1.5 || 200}
          >
            {photo.confidentiality === 0 ? (
              <div
                className="PhotoCard__img-container"
                style={{
                  backgroundImage: `url("${encodeURI(photo.thumbUrl)}")`,
                  width: size || undefined,
                  height: size || undefined
                }}
              />
            ) : (
              <div
                className="PhotoCard__img-container"
                style={{
                  width: size || undefined,
                  height: size || undefined
                }}
              >
                <div className="PhotoCard__locked">
                  <FontAwesomeIcon icon="lock" />
                  <span>Restricted from view</span>
                </div>
              </div>
            )}
          </LazyLoad>
          <div className="PhotoCard__data-container">
            <span>{photo.name}</span>
          </div>
        </a>
      </Card>
    );
  }
}

export default PhotoCard;
