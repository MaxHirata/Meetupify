import React, { Component } from 'react';
import uuid from 'uuid';
import {
    Container,
    Row,
    Col,
    CardGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import VenueItem from '../components/VenueItem';


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

    componentDidMount() {
        this.props.onGetVenues('5ce5354d2bb8d21850259314');
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

                <CardGroup>
                    <Row>
                        {venues.map((venue) => (
                            <Col sm="4" style={colStyle}>
                                <VenueItem
                                    name={venue.name}
                                    location={venue.location}
                                    rating={venue.rating}
                                    price={venue.price}
                                    selectVenue={this.props.onSelectVenue}
                                    id={uuid}
                                    clicked={this.selectVenue}
                                />
                            </Col>

                        ))}
                    </Row>

                </CardGroup>
            </Container>
        );
    }
};


const mapStateToProps = state => ({
    eventVenues: state.event.venues
});

const mapDispatchToProps = dispatch => {
    return {
        onGetVenues: (event_id) => dispatch(actions.getVenues(event_id)),
        onSelectVenue: (venueInfo) => dispatch(actions.setSelectedVenue(venueInfo))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPicker);
