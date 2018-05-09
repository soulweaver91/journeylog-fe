import React from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import classNames from "classnames";
import Util from "../util/Util";
import JournalPageMap from "./JournalPageMap";
import Gallery from "./Gallery";
import parser, { BBCodeContext } from '../util/BBCodeParser';

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
              <BBCodeContext.Provider value={{
                journey: this.props.journey,
                page: this.props.page
              }}>
                {parser.toReact(this.props.page.text)}
              </BBCodeContext.Provider>
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
