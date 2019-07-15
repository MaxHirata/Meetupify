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

    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <h2>{props.eventName}</h2>
                </CardTitle>
                <CardSubtitle><h4>{status}</h4></CardSubtitle>
                <CardText>Deadline: {props.deadlineTime}</CardText>
                <Button color="danger" onClick={() => onSelectEventHandler()}>Select</Button>
                {selected === true ? <Redirect to="/eventBuilder" /> : null}
            </CardBody>
        </Card>
    );
}

export default eventItem;