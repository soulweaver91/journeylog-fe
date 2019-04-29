import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import JourneyKeyPoints from "./JourneyKeyPoints";

@observer
class JourneyList extends React.Component {
  render() {
    return (
      <div className="JourneyList">
        {this.props.journeyStore.journeys
          .sort((j1, j2) => (j1.dateStart < j2.dateStart ? 1 : -1))
          .map((journey) => (
            <Link
              key={journey.slug}
              to={journey.route}
              className="JourneyList__item"
            >
              <Card>
                <CardHeader
                  className="JourneyList__item-cover-header"
                  style={{
                    backgroundImage: journey.background
                      ? `url("${encodeURI(journey.background)}")`
                      : null
                  }}
                >
                  <div className="JourneyList__item-cover-header-inner">
                    <h2>{journey.name}</h2>
                  </div>
                </CardHeader>
                <CardBody>
                  <JourneyKeyPoints journey={journey} />
                </CardBody>
              </Card>
            </Link>
          ))}
      </div>
    );
  }
}

JourneyList.propTypes = {
  // JourneyStore:
};

export default inject("journeyStore")(JourneyList);
