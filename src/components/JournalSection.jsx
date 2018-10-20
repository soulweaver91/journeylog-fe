import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class JournalSection extends React.Component {
  render() {
    const { location, detached, startTime, endTime, children } = this.props;

    const hasOtherNames = location && location.names && location.names.size > 0;

    const otherNames = [];
    if (hasOtherNames) {
      location.names.forEach((nameObj, lang) => {
        otherNames.push(
          <span key={lang} lang={lang}>
            {nameObj.name}
          </span>
        );
      });
    }

    return (
      <div
        className={classNames("JournalSection", {
          "JournalSection__with-location": !!location,
          JournalSection__detached: detached,
          JournalSection__passthrough:
            location && (!children || children.length === 0),
          "JournalSection__with-other-names": hasOtherNames
        })}
      >
        <div className="JournalSection__location-container">
          {location && (
            <div
              className="JournalSection__location"
              style={{
                backgroundColor: location.backgroundColor,
                color: location.accentColor,
                borderColor: location.accentColor
              }}
            >
              <div className="JournalSection__location-icon">
                <FontAwesomeIcon icon={location.icon || "star"} />
              </div>
            </div>
          )}
        </div>
        <div className="JournalSection__text">
          {location && (
            <h3 className="JournalSection__location-label">
              {startTime && (
                <time>
                  {startTime}
                  {endTime && <React.Fragment>– {endTime}</React.Fragment>}
                </time>
              )}
              {location.name}
              {hasOtherNames && (
                <small className="JournalSection__location-other-names">
                  {otherNames}
                </small>
              )}
            </h3>
          )}
          {children}
        </div>
      </div>
    );
  }
}

export default JournalSection;
