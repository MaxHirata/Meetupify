import React, { Component } from 'react';
import uuid from 'uuid';
import {
    Jumbotron,
    Container,
    Row,
    Col,
    CardGroup,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import VenueItem from '../VenueItem/VenueItem';
import './eventPicker.css';


/* Inline Styles */
const colStyle = {
    margin: '0',
    padding: '0'
};

class EventPicker extends Component {
    state = {
        id: uuid,
        selectedVenue: false,
        selectedVenue: {
            name: null,
            location: null,
            rating: null,
            price: null
        }
    }

    componentWillMount() {
        let current_event = this.props.currentEventId;
        console.log("Current Event ID: " + current_event)
        if (current_event) {
            //this.props.onGetVenues(current_event);
            this.props.loadSelectedEvent(current_event)
        }
    };

    venueSelected = (venue) => {
        this.setState({
            selectedVenue: {
                name: venue.venueName,
                location: venue.venueLocation,
                rating: venue.venueRating,
                price: venue.venuePrice
            }
        });
        console.log("Selected Venue: " + venue.venueName);
    };

    selectVenueHandler = (venue) => {
    }

    render() {
        const venues = this.props.eventVenues;
        return (
            <Container>
                {/* <Button id="vote-btn" onClick={this.onSendVoteHandler}>Send Vote</Button> */}
                <div className="eventPicker">
                    <CardGroup>
                        <Row className="justify-content-center">
                            {venues.map((venue) => (
                                <Col lg={4} md={4} sm={12} style={colStyle}>
                                    <VenueItem
                                        name={venue.name}
                                        location={venue.location}
                                        image={venue.image}
                                        link={venue.link}
                                        rating={venue.rating}
                                        price={venue.price}
                                        selectVenue={this.props.onSelectVenue}
                                        key={uuid}
                                        clicked={this.selectVenue}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </CardGroup>
                    <Row className="voting-row">
                        <Col lg={8} md={8} sm={12}>
                            <p id="vote-desc">Vote for your favorite Venue!</p>
                        </Col>
                        <Col lg={4} md={4} sm={12}>
                            <Button id="vote-btn" color="danger" onClick={this.onSendVoteHandler}>SEND VOTE</Button>
                        </Col>
                    </Row>
                </div>

            </Container >

        );
    }
};


const mapStateToProps = state => ({
    eventVenues: state.event.venueList,
    currentEventId: state.eventList.selectedEvent
});

const mapDispatchToProps = dispatch => {
    return {
        onGetVenues: (event_id) => dispatch(actions.getVenues(event_id)),
        onSelectVenue: (venueInfo) => dispatch(actions.setSelectedVenue(venueInfo)),
        sendVote: (event_id, venue) => dispatch(actions.sendVote(event_id, venue)),
        loadSelectedEvent: (event_id) => dispatch(actions.loadSelectedEvent(event_id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPicker);
