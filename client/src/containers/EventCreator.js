import React, { Component } from 'react';
import EventPicker from '../components/EventPicker';
import TimePicker from '../components/TimePicker';
import DeadlineTime from '../components/DeadlineTime';
import {
    Container,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class EventCreator extends Component {

    render() {

        if (!this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <Container>
                <DeadlineTime />
                <EventPicker />
                <TimePicker />
                <Button>Submit</Button>
            </Container>
        );
    }
}

const maptStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(maptStateToProps)(EventCreator);