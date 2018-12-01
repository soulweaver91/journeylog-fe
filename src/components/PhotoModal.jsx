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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import RequestStateLoader from "./loader/RequestStateLoader";

const photoHashRegex = /^#photo:(.+)\/(.+)$/;

@withRouter
@inject("photoModalStore", "photoStore")
@observer
class PhotoModal extends React.Component {
  componentDidMount() {
    window.addEventListener("hashchange", this.loadPhotoFromHash);
    this.loadPhotoFromHash();
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.loadPhotoFromHash);
  }

  loadPhotoFromHash = () => {
    const { photoStore } = this.props;

    const hashData = window.document.location.hash.match(photoHashRegex);
    if (!hashData) {
      return;
    }

    photoStore.loadPhoto(hashData[1], hashData[2]);
    this.props.photoModalStore.open(hashData[1], hashData[2]);
  };

  render() {
    const { photoModalStore, photoStore } = this.props;
    const { journeySlug, filename } = photoModalStore;

    const photo = photoStore.getPhoto(journeySlug, filename);
    const state = photoStore.requestStatuses.get(`${journeySlug}/${filename}`);

    return (
      <Modal isOpen={photoModalStore.isOpen} className="PhotoModal">
        <ModalHeader toggle={photoModalStore.close}>
          {photo ? photo.name : filename}
        </ModalHeader>
        <ModalBody>
          <RequestStateLoader
            state={state}
            loaded={() => (
              <Row>
                <Col xs="12" md="9" className="PhotoModal__photo">
                  {photo.confidentiality === 0 ? (
                    <img src={photo.accessUrl} alt="" />
                  ) : (
                    <span>
                      Viewing of this photo is restricted at this time because
                      it contains sensitive personal details or other content
                      deemed not shareable to the general public. Authorized
                      people may view this content later once the support for
                      that feature has been added.
                    </span>
                  )}
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
                      <ListGroupItemText tag="div">
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
                    {photo.cameraMake && (
                      <ListGroupItem>
                        <ListGroupItemHeading>Camera</ListGroupItemHeading>
                        <ListGroupItemText>
                          {photo.cameraMake} {photo.cameraModel}
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
                    {photo.isoSpeed && (
                      <ListGroupItem>
                        <ListGroupItemHeading>Settings</ListGroupItemHeading>
                        <ListGroupItemText tag="div">
                          {photo.isoSpeed && <p>ISO speed: {photo.isoSpeed}</p>}
                          {photo.focalLength && (
                            <p>Focal length: {photo.focalLength} mm</p>
                          )}
                          {photo.fValue && <p>F-value: {photo.fValue}</p>}
                          {photo.exposure && (
                            <p>Exposure: {photo.exposure} s</p>
                          )}
                          {photo.flashFired && (
                            <p>
                              Flash:{" "}
                              {photo.flashManual ? "Manual" : "Automatic"}
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
                        {photo.width} × {photo.height} (
                        {((photo.width * photo.height) / 1e6).toFixed(1)} MPix)
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
                    {photo.confidentiality === 0 && (
                      <ListGroupItem
                        tag="a"
                        href={photo.accessUrl}
                        target="_blank"
                      >
                        View in full size{" "}
                        <FontAwesomeIcon
                          icon="chevron-right"
                          className="pull-right"
                        />
                      </ListGroupItem>
                    )}
                  </ListGroup>
                </Col>
              </Row>
            )}
          />
        </ModalBody>
      </Modal>
    );
  }
}

export default PhotoModal;
