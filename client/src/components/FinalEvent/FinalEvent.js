import React from 'react';
import { connect } from 'react-redux';
import {
    Jumbotron
} from 'reactstrap';

const finalEvent = () => {
    return (
        <Jumbotron>
            <h1 className="display-3">Voting Closed</h1>
            <p className="lead">This Event is no longer Active and Final Event has Been Decided</p>
            <hr className="my-2" />
        </Jumbotron>
    );
}

const mapStateToProps = state => ({
    finalEvent: state.event.finalEvent
});

export default connect(mapStateToProps)(finalEvent);