import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Jumbotron
} from 'reactstrap';
import './finalEvent.css';

class finalEvent extends Component {

    render() {
        return (
            <Container>
                <div className="finalEvent">
                    <h2 className="display-4">Voting Closed</h2>
                    <p className="lead">This Event is no longer Active and Final Event has Been Decided</p>
                    <hr className="my-2" />

                    <img className="finalEvent-img" src={this.props.venueImage} />
                    <h2 className="finalEvent-name">{this.props.name}</h2>
                    <a href={this.props.venueLink}>Yelp Venue Link</a>
                    <p className="location">{this.props.location}</p>
                    <h4 className="rating">Rating: {this.props.rating}</h4>
                    <h4 className="price">Price: {this.props.price}</h4>
                </div>

            </Container>
        );
    }

}

const mapStateToProps = state => ({
    finalEvent: state.event.finalEvent,
    name: state.event.finalEvent.name,
    venueImage: state.event.finalEvent.image,
    venueLink: state.event.finalEvent.link,
    location: state.event.finalEvent.location,
    rating: state.event.finalEvent.rating,
    price: state.event.finalEvent.price

});

export default connect(mapStateToProps)(finalEvent);