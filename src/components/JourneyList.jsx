import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

@observer
class JourneyList extends React.Component {
  render() {
    return (
      <ListGroup className="JourneyList">
        {this.props.journeyStore.journeys.map((journey) => (
          <ListGroupItem
            key={journey.slug}
            tag={Link}
            to={journey.route}
            className="JourneyList__item"
            style={{
              backgroundImage: journey.background
                ? `url(${journey.background})`
                : null
            }}
          >
            <div className="JourneyList__item-inner">{journey.name}</div>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}

JourneyList.propTypes = {
  // JourneyStore:
};

export default inject("journeyStore")(JourneyList);
