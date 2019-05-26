import React, { Component } from 'react';
import {
    Container,
    CardGroup,
    Row,
    Col
} from 'reactstrap';
import EventItem from '../components/EventItem';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';
import uuid from 'uuid';


/* Inline Styles */
const colStyle = {
    margin: '0',
    padding: '0'
};

class DisplayEvents extends Component {
    componentWillMount() {
        this.props.getAllEvents();
    }


    render() {

        const events = this.props.events;
        console.log(events);

        return (
            <Container>

                {/* display backlogged events (both active and past events)
                if( user clicks on active event )
                    -> routes to active Event Page

                if( no events )
                    diplay ("Time to create an EVENT!!!!")

                Create Event Button */}


                <CardGroup>
                    <Row>
                        {events.map((event) => (
                            <Col sm="4" style={colStyle}>
                                <EventItem
                                    key={uuid}
                                    event_id={event._id}
                                    eventName={event.eventName}
                                    status={event.status}
                                    deadlineTime={event.deadlineTime}
                                    selectEvent={this.props.setSelectedEvent} />
                            </Col>

                        ))}
                    </Row>

                </CardGroup>

            </Container>
        );
    }
}

const mapStateToProps = state => ({
    events: state.eventList.eventList
});

const mapDispatchToProps = dispatch => {
    return {
        getAllEvents: () => dispatch(actions.getAllEvents()),
        setSelectedEvent: (event_id) => dispatch(actions.selectEvent(event_id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEvents);