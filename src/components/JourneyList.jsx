import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@observer
class JourneyList extends React.Component {
	render() {
		return (
			<div>
				Journeys
				<ListGroup>
          {this.props.journeyStore.journeys.map((journey) => (
            <ListGroupItem key={journey.slug} tag={Link} to={journey.route}>
              {journey.name}
            </ListGroupItem>
          ))}
				</ListGroup>
			</div>
		);
	}
}

JourneyList.propTypes = {
  // JourneyStore:
};

export default inject('journeyStore')(JourneyList);
