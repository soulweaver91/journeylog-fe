import React from "react";
import {
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from "reactstrap";
import { inject, observer } from "mobx-react";
import { DateTime } from "luxon";
import Util from "../util/Util";
import { liteParser } from "../util/BBCodeParser";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

@withRouter
@inject("photoModalStore")
@observer
class PhotoModal extends React.Component {
  componentDidMount() {
    this.openHash();
  }

  openHash = () => {
    const hashData = window.document.location.hash.match(/^#photo:(.+)$/);

    if (!hashData) {
      return;
    }

    const photo = this.props.journey.findPhoto(hashData[1]);

    if (photo) {
      this.props.photoModalStore.open(photo);
    }
  };

  render() {
    const { photoModalStore } = this.props;
    const { photo } = photoModalStore;

    return (
      <Modal isOpen={photoModalStore.isOpen} className="PhotoModal">
        {photo && (
          <React.Fragment>
            <ModalHeader toggle={photoModalStore.close}>
              {photo.name}
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col xs="12" md="9" className="PhotoModal__photo">
                  <img src={photo.fullUrl} alt="" />
                </Col>
                <Col xs="12" md="3" className="PhotoModal__attributes">
                  <ListGroup>
                    {photo.description && (
                      <ListGroupItem>
                        {liteParser.toReact(photo.description)}
                      </ListGroupItem>
                    )}
                    <ListGroupItem>
                      <ListGroupItemHeading>Taken on</ListGroupItemHeading>
                      <ListGroupItemText>
                        <p>
                          <FontAwesomeIcon icon="suitcase" fixedWidth />
                          <span className="sr-only">Local:</span>{" "}
                          {photo.localTime
                            .setLocale("en-GB")
                            .toLocaleString(
                              DateTime.DATETIME_FULL_WITH_SECONDS
                            )}
                        </p>
                        <p>
                          <FontAwesomeIcon icon="home" fixedWidth />
                          <span className="sr-only">Home:</span>{" "}
                          {photo.homeTime
                            .setLocale("en-GB")
                            .toLocaleString(
                              DateTime.DATETIME_FULL_WITH_SECONDS
                            )}
                        </p>
                      </ListGroupItemText>
                    </ListGroupItem>
                    {photo.camera_make && (
                      <ListGroupItem>
                        <ListGroupItemHeading>Camera</ListGroupItemHeading>
                        <ListGroupItemText>
                          {photo.camera_make} {photo.camera_model}
                        </ListGroupItemText>
                      </ListGroupItem>
                    )}
                    {photo.coords && (
                      <ListGroupItem>
                        <ListGroupItemHeading>Location</ListGroupItemHeading>
                        <ListGroupItemText>
                          <a
                            href={`https://www.google.com/maps/place/${
                              photo.latitude
                            },${photo.longitude}/@18z`}
                            target="_blank"
                          >
                            {Util.formatCoordinate(photo.coords)}
                          </a>
                        </ListGroupItemText>
                      </ListGroupItem>
                    )}
                    {photo.iso_speed && (
                      <ListGroupItem>
                        <ListGroupItemHeading>Settings</ListGroupItemHeading>
                        <ListGroupItemText>
                          {photo.iso_speed && (
                            <p>ISO speed: {photo.iso_speed}</p>
                          )}
                          {photo.focal_length && (
                            <p>Focal length: {photo.focal_length} mm</p>
                          )}
                          {photo.f_value && <p>F-value: {photo.f_value}</p>}
                          {photo.exposure && (
                            <p>Exposure: {photo.exposure} s</p>
                          )}
                          {photo.flash_fired && (
                            <p>
                              Flash:{" "}
                              {photo.flash_manual ? "Manual" : "Automatic"}
                            </p>
                          )}
                        </ListGroupItemText>
                      </ListGroupItem>
                    )}
                    <ListGroupItem>
                      <ListGroupItemHeading>File size</ListGroupItemHeading>
                      <ListGroupItemText>
                        {Util.formatFileSize(photo.filesize)}
                      </ListGroupItemText>
                    </ListGroupItem>
                    {photo.name !== photo.filename && (
                      <ListGroupItem>
                        <ListGroupItemHeading>
                          Original file name
                        </ListGroupItemHeading>
                        <ListGroupItemText>{photo.filename}</ListGroupItemText>
                      </ListGroupItem>
                    )}
                    <ListGroupItem>
                      <ListGroupItemHeading>Dimensions</ListGroupItemHeading>
                      <ListGroupItemText>
                        {photo.width} × {photo.height} ({(
                          photo.width *
                          photo.height /
                          1e6
                        ).toFixed(1)}{" "}
                        MPix)
                      </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                      <ListGroupItemHeading>Tags</ListGroupItemHeading>
                      <ListGroupItemText>
                        {photo.tags.length > 0 ? (
                          <div>todo</div>
                        ) : (
                          <span>No tags.</span>
                        )}
                      </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem tag="a" href={photo.fullUrl} target="_blank">
                      View in full size{" "}
                      <FontAwesomeIcon
                        icon="chevron-right"
                        className="pull-right"
                      />
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </ModalBody>
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

export default PhotoModal;
