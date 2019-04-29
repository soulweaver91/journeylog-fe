import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class JourneyKeyPoints extends React.Component {
  render() {
    const { journey } = this.props;

    return (
      <ul className="JourneyKeyPoints">
        <li title={journey.photosCount + " photos taken"}>
          <FontAwesomeIcon icon="images" />
          <span>{journey.photosCount}</span>
          <span className="sr-only"> photos</span>
        </li>
        <li title={journey.journalPagesCount + " journal pages written"}>
          <FontAwesomeIcon icon="book" />
          <span>{journey.journalPagesCount}</span>
          <span className="sr-only"> journal pages</span>
        </li>
        <li
          title={journey.uniqueVisitedLocations.length + " locations visited"}
        >
          <FontAwesomeIcon icon="map-pin" />
          <span>{journey.uniqueVisitedLocations.length}</span>
          <span className="sr-only"> visited locations</span>
        </li>
        {/* <li title={journey.map_route.length + " points in timeline"}>
              <FontAwesomeIcon icon="route" />
              <span>{journey.map_route.length}</span>
              <span className="sr-only"> map timeline points</span>
            </li> */}
      </ul>
    );
  }
}

export default JourneyKeyPoints;
