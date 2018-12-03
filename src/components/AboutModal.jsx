import React from "react";
import { inject, observer } from "mobx-react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

@inject("aboutModalStore")
@observer
class AboutModal extends React.Component {
  render() {
    const { aboutModalStore } = this.props;

    /* eslint-disable react/jsx-no-target-blank */
    // noinspection JSUnresolvedVariable
    return (
      <Modal isOpen={aboutModalStore.isOpen} className="AboutModal">
        <ModalHeader toggle={aboutModalStore.close}>
          About JourneyLog
        </ModalHeader>
        <ModalBody>
          <p>
            This software was written in 2018 by{" "}
            <a href="https://soulweaver.fi/" target="_blank" rel="noopener">
              Soulweaver
            </a>{" "}
            to accomodate the photos of their trip in Japan in the April of the
            same year. The goal has been to be able to reuse the same journal
            and gallery functionality on later journeys around the world in the
            coming years.
          </p>

          <p className="AboutModal__build">
            Build:{" "}
            <a
              href={`${process.env.GIT_PUBLIC_REPOSITORY}/commit/${
                process.env.GIT_COMMITHASH
              }`}
              target="_blank"
              rel="noopener"
            >
              git-
              {process.env.GIT_BRANCH}-{process.env.GIT_VERSION}
            </a>{" "}
            ({process.env.BUILD_DATE})
          </p>
        </ModalBody>
      </Modal>
    );
  }
}

export default AboutModal;
