import React, { Component } from 'react';
import {
    Container,
    CardGroup,
    Row,
    Col,
    Jumbotron
} from 'reactstrap';
import EventItem from '../../components/EventItem/EventItem';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import uuid from 'uuid';
import CreateEvent from '../../components/CreateEvent/CreateEvent';
import { Redirect } from 'react-router-dom';


/* Inline Styles */
const colStyle = {
    margin: '0',
    padding: '0'
};

class DisplayEvents extends Component {
    componentWillMount() {
        this.props.getAllEvents();
        this.props.getParticipatingEvents();
    }


    render() {

        const events = this.props.events;
        const participatingEvents = this.props.participatingEvents;

        // console.log("My Events Data")
        // console.log(events)

        // console.log("ParticipatingEvents")
        // console.log(participatingEvents)

        // if (!this.props.isAuthenticated) {
        //     return <Redirect to="/" />
        // }

        let displayEvents = (
            <CardGroup>
                <Row>
                    {events.map((event) => (
                        <Col lg={3} md={4} sm={12} style={colStyle}>
                            <EventItem
                                key={uuid}
                                event_id={event._id}
                                eventName={event.eventName}
                                status={event.active}
                                deadlineTime={event.deadlineTime}
                                selectEvent={this.props.setSelectedEvent} />
                        </Col>

                    ))}
                </Row>

            </CardGroup>
        )

        let displayParticipantingEvents = (
            <CardGroup>
                <Row>
                    {participatingEvents.map((event) => (
                        <Col lg={3} md={4} sm={12} style={colStyle}>
                            <EventItem
                                key={uuid}
                                event_id={event._id}
                                eventName={event.eventName}
                                status={event.active}
                                deadlineTime={event.deadlineTime}
                                selectEvent={this.props.setSelectedEvent} />
                        </Col>

                    ))}
                </Row>

            </CardGroup>
        )

        return (
            <Container>

                {/* display backlogged events (both active and past events)
                if( user clicks on active event )
                    -> routes to active Event Page

                if( no events )
                    diplay ("Time to create an EVENT!!!!")

                Create Event Button */}
                <Jumbotron>
                    <h2>My Events</h2>
                    <hr className='my-2' />
                    <CreateEvent />
                    {events !== undefined ? displayEvents : null}
                </Jumbotron>

                <Jumbotron>
                    <h2>Participating Events</h2>
                    <hr className="my-2" />
                    {participatingEvents !== undefined ? displayParticipantingEvents : null}
                </Jumbotron>

            </Container>
        );
    }
}

const mapStateToProps = state => ({
    events: state.eventList.eventList,
    participatingEvents: state.eventList.participatingEvents,
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username
});

const mapDispatchToProps = dispatch => {
    return {
        getAllEvents: () => dispatch(actions.getAllEvents()),
        getParticipatingEvents: () => dispatch(actions.getParticipatingEvents()),
        setSelectedEvent: (event_id) => dispatch(actions.selectEvent(event_id)),
        loadSelectedEvent: (event_id) => dispatch(actions.loadSelectedEvent(event_id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEvents);