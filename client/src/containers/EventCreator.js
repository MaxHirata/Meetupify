import React, { Component } from 'react';
import EventPicker from '../components/EventPicker';
import TimePicker from '../components/TimePicker';
import DeadlineTime from '../components/DeadlineTime';
import {
    Container,
    Button
} from 'reactstrap';

class EventCreator extends Component {
    render() {
        return (
            <Container>
                <DeadlineTime />
                <EventPicker />
                <TimePicker />
                <Button>Submit</Button>
            </Container>
        );
    }
}

export default EventCreator;