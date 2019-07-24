import React, { Component } from 'react';
import uuid from 'uuid';
import VenueItem from '../../components/VenueItem/VenueItem';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { updateObject } from '../../shared/utilities';
import { Redirect } from 'react-router-dom';
import './addNewVenue.css';

import {
    Container,
    Button,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Label,
    Input,
    Row,
    Col,
    CardGroup,
    Badge,
    InputGroupText,
} from 'reactstrap';

/* Inline Styles */
const colStyle = {
    margin: '0',
    padding: '0'
};

class AddNewVenues extends Component {

    state = {
        selectedVenue: false,
        selectedVenue: {
            name: null,
            location: null,
            rating: null,
            price: null
        },
        searchData: {
            location: "",
            term: ""
        },
        selectedVenueName: ""
    }



    onHandlerChangeLocation(event) {
        const updatedSearchData = updateObject(this.state.searchData, {
            location: event.target.value
        });
        this.setState({ searchData: updatedSearchData });
    }

    onHanderChangeTerm(event) {
        const updatedSearchData = updateObject(this.state.searchData, {
            term: event.target.value
        });
        this.setState({ searchData: updatedSearchData });
    }

    onHandleSubmitSearch() {
        this.props.loadYelpVenues(this.state.searchData);
    }

    onHandlerAddVenue() {
        //console.log(this.props.selectedVenue);
        this.props.addVenue(this.props.currentEventId, this.props.selectedVenue);
    }

    render() {

        const onChange = () => {
            if (this.props.selectVenue) {
                this.setState({ selectedVenueName: this.props.selectedVenue.name });
            }
        }
        const venues = this.props.yelpVenues;

        // if (!this.props.isAuthenticated) {
        //     return <Redirect to="/" />
        // }

        return (
            <Container>
                <div className="addVenueDisplay">
                    <Form>
                        <Row form>
                            <Col xl={5} lg={5} md={5} sm={12}>
                                <FormGroup className="locationInput">
                                    <Label for="location" >Location</Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        id="venueLocation"
                                        value={this.state.searchData.location}
                                        onChange={(event) => this.onHandlerChangeLocation(event)}
                                        placeholder="city, state" />
                                </FormGroup>
                            </Col>
                            <Col xl={5} lg={5} md={5} sm={12}>
                                <FormGroup className="termInput">
                                    <Label for="term" >Terms</Label>
                                    <Input
                                        type="text"
                                        name="term"
                                        id="venueTerms"
                                        value={this.state.searchData.term}
                                        onChange={(event) => this.onHanderChangeTerm(event)}
                                        placeholder="Coffee, Cocktails, Ramen" />
                                </FormGroup>
                            </Col>
                            <Col xl={2} lg={2} md={2} sm={12} >
                                <div className="submitInput">
                                    <Label for="submitButton">Use Yelp</Label>
                                    <InputGroup>
                                        <Button id="submitButton" color='danger' onClick={() => this.onHandleSubmitSearch()} block>Search</Button>


                                    </InputGroup>
                                    {/* <Input type="submit" color="danger" value="Submit" onClick={() => this.onHandleSubmitSearch()} /> */}
                                </div>
                            </Col>
                        </Row>
                    </Form>

                    <div className="venueCards-display">

                        <h2>Add Venues to Event: {this.props.eventName}</h2>
                        <div className="venueCards-submit">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">VenueName</InputGroupAddon>
                                <Input name="selectedVenueName" onChange={onChange()} value={this.state.selectedVenueName} placeholder="Select A Venue Below...." />
                                <InputGroupAddon addonType="append">
                                    <Button color="danger" onClick={() => this.onHandlerAddVenue()}>Add to Event</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <Badge color="secondary" pill>Display Yelp venues to add to current event's venue list</Badge>
                        <CardGroup>
                            <Container>
                                <Row key={uuid}>
                                    {venues.map((venue) => (
                                        <Col lg={3} md={4} sm={12} style={colStyle} key={uuid}>
                                            <VenueItem
                                                name={venue.name}
                                                image={venue.image}
                                                link={venue.link}
                                                location={venue.location}
                                                rating={venue.rating}
                                                price={venue.price}
                                                selectVenue={this.props.onSelectVenue}
                                                key={uuid}
                                                clicked={this.selectVenue}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </CardGroup>
                    </div>
                </div>


            </Container>
        );
    }
}

const mapStateToProps = state => ({
    yelpVenues: state.yelpVenues.venues,
    eventVenues: state.event.venues,
    eventName: state.event.eventName,
    currentEventId: state.eventList.selectedEvent,
    selectedVenue: state.event.selectedVenue,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => {
    return {
        loadYelpVenues: (searchParams) => dispatch(actions.loadYelpVenues(searchParams)),
        getYelpVenues: () => dispatch(actions.getYelpVenues()),
        onSelectVenue: (venueInfo) => dispatch(actions.setSelectedVenue(venueInfo)),
        addVenue: (event_id, venue) => dispatch(actions.addVenue(event_id, venue))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AddNewVenues);