import React from 'react';
import classNames from 'classnames';

class JournalSection extends React.Component {
  render() {
    return (
      <div className={classNames("JournalSection", {
        "JournalSection__with-location": !!this.props.location,
        "JournalSection__connected": this.props.connected && !!this.props.location,
        "JournalSection__passthrough": this.props.location && !this.props.children
      })}>
        <div className="JournalSection__location-container">
          {this.props.location && <div className="JournalSection__location">
            <div className="JournalSection__location-icon">
              ★
            </div>
          </div>}
        </div>
        <div className="JournalSection__text">
          {this.props.location && <h3 className="JournalSection__location-label">
            {this.props.location}
          </h3>}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default JournalSection;
