import React, { Component } from 'react';
import {
    Container,
    Button
} from 'reactstrap';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';

class DisplayEvents extends Component {
    componentWillMount() {
        this.props.getAllEvents("working?????????");
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
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    events: state.eventList.eventList
});

const mapDispatchToProps = dispatch => {
    return {
        getAllEvents: (message) => dispatch(actions.getAllEvents(message))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEvents);