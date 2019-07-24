import React from 'react';
import {
    Card,
    CardText,
    CardBody,
    CardLink,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import './eventItem.css';

/** Bootstrap Override Styling */

const cardBorder = {
    "border-radius": "2em",
    "border": "2pt solid rgba(128, 128, 128, 0.692)"
}

/**--------------------------- */

const eventItem = (props) => {
    let status = 'ACTIVE';

    if (props.status === false) {
        status = 'PAST'
    }

    let selected = false;

    const onSelectEventHandler = () => {
        props.selectEvent(props.event_id);
        selected = true;
    }

    const deadlineStr = String(props.deadlineTime).substr(0, 10);


    let eventStatus = (<h4 className="statusActive">{status}</h4>);
    if (props.status === false) {
        eventStatus = (<h4 className="statusPast">{status}</h4>)
    }

    return (
        <Card className="eventCard" style={cardBorder}>
            <CardBody>
                <CardTitle>
                    <h2>{props.eventName}</h2>
                </CardTitle>
                <CardSubtitle>{eventStatus}</CardSubtitle>

                <CardText>Deadline: <span className="deadline">{deadlineStr}</span></CardText>
                <Button color="info" onClick={() => onSelectEventHandler()}>Select</Button>
                {selected === true ? <Redirect to="/eventBuilder" /> : null}
            </CardBody>


        </Card>
    );
}

export default eventItem;