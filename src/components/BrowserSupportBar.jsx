import React from "react";
import Modernizr from "modernizr";
import storage from "local-storage-fallback";
import { Button } from "reactstrap";
import Banner from "./basic/Banner";

const BAR_STORAGE_KEY = "browserBarDismissed";

class BrowserSupportBar extends React.Component {
  state = {
    show: false
  };

  componentDidMount() {
    const dismissed = storage.getItem(BAR_STORAGE_KEY);

    if (!dismissed) {
      if (Modernizr.testProp("imageOrientation", "from-image")) {
        return;
      }

      Modernizr.on("exiforientation", (result) => {
        if (!result) {
          this.setState({
            show: true
          });
        }
      });
    }
  }

  dismiss = () => {
    storage.setItem(BAR_STORAGE_KEY, "1");

    this.setState({
      show: false
    });
  };

  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <Banner>
        <span>
          Heads up! Your browser doesn't support displaying images in their
          proper orientation based on their internal EXIF data. As a result,
          some photos may show up sideways.
        </span>
        <span>
          <Button onClick={this.dismiss}>I understand</Button>
        </span>
      </Banner>
    );
  }
}

export default BrowserSupportBar;
