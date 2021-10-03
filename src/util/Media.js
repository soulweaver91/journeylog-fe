import { observable } from "mobx/lib/mobx";

export const UI_BREAKPOINTS = observable({
  xs: "(max-width: 767px)",
  su: "(min-width: 768px)",
  sm: "(min-width: 768px) and (max-width: 991px)",
  md: "(min-width: 992px) and (max-width: 1199px)",
  mu: "(min-width: 992px)",
  lg: "(min-width: 1200px)",
  noScroll: "(min-width: 992px) and (min-height: 350px)"
});

// Modified code from https://github.com/foxhound87/mobx-react-matchmedia
//
// The MIT License (MIT)
//
// Copyright (c) 2016 Claudio Savino
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import matchMediaMock from "match-media-mock";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { toJS, extendObservable, set, action, runInAction } from "mobx";

const matchMedia = matchMediaMock.create();

let config = null;

const setMatchMediaConfig = (req = null) => {
  const isClient = typeof window !== "undefined";

  if (!isClient && req) {
    config = {
      type: "screen",
      width: req.params.width,
      height: req.params.height
    };
  }

  if (isClient && !req) {
    config = {
      type: "screen",
      width: window.innerWidth, // eslint-disable-line
      height: window.innerHeight // eslint-disable-line
    };
  }

  if (config) {
    matchMedia.setConfig(config);
  }
};

let mobxMatchMediaBreakpoints;

const setObservable = (observable, obj) =>
  set ? set(observable, obj) : extendObservable(observable, obj);

export class MatchMediaProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
    breakpoints: PropTypes.object
  };

  constructor(props) {
    super(props);
    if (!mobxMatchMediaBreakpoints) {
      mobxMatchMediaBreakpoints = Object.assign(
        {},
        toJS(this.props.breakpoints)
      );
    }
    if (!this.templates) {
      this.templates = Object.assign({}, toJS(mobxMatchMediaBreakpoints));
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize); // eslint-disable-line
    this.matchBreakpoints(); // set initials values
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize); // eslint-disable-line
  }

  handleResize = (e) => {
    e.preventDefault();
    this.matchBreakpoints();
  };

  matchBreakpoints = () => {
    runInAction("match breakpoints", () => {
      setMatchMediaConfig();
      Object.keys(this.templates).forEach((key) =>
        this.updateBreakpoints(key, this.templates[key])
      );
    });
  };

  updateBreakpoints = action("update breakpoints", (key, val) => {
    const match = matchMedia(val).matches;
    setObservable(this.props.breakpoints, { [key]: match });
  });

  render() {
    return <div>{this.props && this.props.children}</div>;
  }
}
