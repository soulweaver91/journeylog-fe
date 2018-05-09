import React from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import JournalSection from "./JournalSection";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import classNames from "classnames";
import Util from "../util/Util";
import JournalPageMap from "./JournalPageMap";
import Gallery from "./Gallery";
import PhotoCard from "./PhotoCard";

class JournalPage extends React.Component {
  tabs = [
    {
      text: 'Journal',
      id: 'journal'
    },
    {
      text: 'Gallery',
      id: 'gallery'
    },
    {
      text: 'Map',
      id: 'map'
    }
  ];

  render() {
    const activePage = Util.getNextPathElement(this.props.location, this.props.match);

    return (
      <div className="JournalPage">
        <h2 className="JournalPage__title">{this.props.match.params.day}</h2>
        <div className="JournalPage__nav">
          <Nav tabs>
            {this.tabs.map((tab) => (
              <NavItem key={tab.id}>
                <NavLink tag={Link} to={`${this.props.match.url}/${tab.id}`} className={classNames({
                  active: activePage === tab.id
                })}>
                  {tab.text}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
        <div className="JournalPage__content">
          <Switch>
            <Route path={`${this.props.match.url}/journal`} render={() => (<div>
              <JournalSection>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.
              </JournalSection>
              <JournalSection location="1" connected>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.  2
                {this.props.page.photos.length > 0 && <PhotoCard photo={this.props.page.photos[0]}/>}
              </JournalSection>
              <JournalSection location="2" connected>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.  3
              </JournalSection>
              <JournalSection location="1" connected />
              <JournalSection location="2" connected />
              <JournalSection location="3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.  3
              </JournalSection>
              <JournalSection>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.  4
                {this.props.page.photos.length > 1 && <PhotoCard photo={this.props.page.photos[1]}/>}
              </JournalSection>
              <JournalSection location="1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada tempus ligula, at vulputate enim convallis sit amet. Curabitur aliquet ipsum non tortor faucibus pretium. Aliquam elementum fringilla dolor, non rhoncus dui lacinia quis. Aliquam viverra lorem eros, eu sodales ante vulputate eu. Phasellus eget ligula commodo, aliquet dui quis, faucibus turpis. Cras rutrum et lorem eu tempus. Aliquam pretium augue in nisl bibendum, tristique pulvinar sapien luctus.  5
              </JournalSection>
            </div>)} />
            <Route path={`${this.props.match.url}/gallery`} render={() => <Gallery photos={this.props.page.photos} />} />
            <Route path={`${this.props.match.url}/map`} render={() => <JournalPageMap />} />
            <Redirect path={`${this.props.match.url}`} to={`${this.props.match.url}/journal`} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default JournalPage;
