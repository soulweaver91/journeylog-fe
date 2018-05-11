import React from "react";
import classNames from "classnames";

class JournalSection extends React.Component {
  render() {
    const hasOtherNames =
      this.props.location &&
      this.props.location.otherNames &&
      this.props.location.otherNames.size > 0;

    const otherNames = [];
    if (hasOtherNames) {
      this.props.location.otherNames.forEach((name, lang) => {
        otherNames.push(<span key={lang}>{name}</span>);
      });
    }

    return (
      <div
        className={classNames("JournalSection", {
          "JournalSection__with-location": !!this.props.location,
          JournalSection__detached: this.props.detached,
          JournalSection__passthrough:
            this.props.location &&
            (!this.props.children || this.props.children.length === 0),
          "JournalSection__with-other-names": hasOtherNames
        })}
      >
        <div className="JournalSection__location-container">
          {this.props.location && (
            <div className="JournalSection__location">
              <div className="JournalSection__location-icon">★</div>
            </div>
          )}
        </div>
        <div className="JournalSection__text">
          {this.props.location && (
            <h3 className="JournalSection__location-label">
              {this.props.location.name}
              {hasOtherNames && (
                <small className="JournalSection__location-other-names">
                  {otherNames}
                </small>
              )}
            </h3>
          )}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default JournalSection;
