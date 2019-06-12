import React, { Component } from 'react';
import uuid from 'uuid';
import VenueItem from './../components/VenueItem';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import { updateObject } from '../shared/utilities';
import { Redirect } from 'react-router-dom';

import {
    Container,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    CardGroup
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
        }
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

    render() {

        const venues = this.props.yelpVenues;

        if (!this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <Container>
                <Form inline>
                    <Row>
                        <Col lg={{ size: 'auto', offset: 1 }} md={{ size: 'auto', offset: 1 }} sm="10">
                            <FormGroup>
                                <Label for="locations" >Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    id="venueLocation"
                                    value={this.state.searchData.location}
                                    onChange={(event) => this.onHandlerChangeLocation(event)}
                                    placeholder="city, state" />
                            </FormGroup>
                        </Col>
                        <Col lg={{ size: 'auto', offset: 1 }} md={{ size: 'auto', offset: 1 }} sm="10">
                            <FormGroup>
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
                        <Col sm={{ size: 'auto', offset: 1 }}>
                            <Button color='danger' onClick={() => this.onHandleSubmitSearch()}>Submit</Button>
                        </Col>

                    </Row>

                </Form>

                Display yelp events
                submit button add to event venue list

                <CardGroup>
                    <Row key={uuid}>
                        {venues.map((venue) => (
                            <Col sm="4" style={colStyle} key={uuid}>
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

                </CardGroup>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    yelpVenues: state.yelpVenues.venues,
    eventVenues: state.event.venues,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
    return {
        loadYelpVenues: (searchParams) => dispatch(actions.loadYelpVenues(searchParams)),
        getYelpVenues: () => dispatch(actions.getYelpVenues()),
        onSelectVenue: (venueInfo) => dispatch(actions.setSelectedVenue(venueInfo))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AddNewVenues);