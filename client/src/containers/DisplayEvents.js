import React, { Component } from 'react';
import EventPicker from '../components/EventPicker';
import TimePicker from '../components/TimePicker';
import DeadlineTime from '../components/DeadlineTime';
import {
    Container,
    Button
} from 'reactstrap';

class DisplayEvents extends Component {
    render() {
        return (
            <Container>
                display backlogged events (both active and past events)
                if( user clicks on active event )
                    -> routes to active Event Page

                if( no events )
                    diplay ("Time to create an EVENT!!!!")

                Create Event Button
            </Container>
        );
    }
}

export default DisplayEvents;