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

const eventItem = (props) => {
    let status = 'ACTIVE';
    if (props.status === false) {
        status = 'PAST'
    }

    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <h2>{props.eventName}</h2>
                </CardTitle>
                <CardSubtitle><h4>{status}</h4></CardSubtitle>
                <CardText>Deadline: {props.deadlineTime}</CardText>
                <Button color="danger" onClick={() => props.selectEvent(props.event_id)}>Select</Button>
            </CardBody>
        </Card>
    );
}

export default eventItem;