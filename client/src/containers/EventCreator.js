import React, { Component } from 'react';
import EventPicker from '../components/EventPicker';
import TimePicker from '../components/TimePicker';
import DeadlineTime from '../components/DeadlineTime';
import ParticipantList from '../components/ParticipantList';
import * as actions from '../store/actions/';
import {
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



class EventCreator extends Component {

    componentWillMount() {
        const event_id = this.props.currentEventId;
        if (event_id) {
            this.props.loadCurrentEvent(event_id);
        }
    }

    onSendVoteHandler = () => {
        this.props.setAlert(this.props.currentEventId, "success");
        if (this.props.selectedVenue === null) {
            this.props.setAlert("No Venue was Set for Vote", "danger");
        } else {
            this.props.sendVote(this.props.currentEventId, this.props.selectedVenue);
            this.props.setAlert("Vote Sent!!!", "success");
        }
    }

    render() {

        // if (!this.props.isAuthenticated) {
        //     return <Redirect to="/" />
        // }

        return (
            <Container>
                <Row>
                    <Col>
                        <div className="CurrentEventHeader">
                            Current Event: {this.props.currentEventName}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} md={6} sm={12} >
                        {/* <Toast>
                            <ToastHeader icon="danger">Countdown</ToastHeader>
                            <ToastBody>
                                <DeadlineTime />
                            </ToastBody>
                        </Toast> */}
                        Countdown: <DeadlineTime />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        Event Date: MM/DD/YYYY
                    </Col>
                </Row>
                <Row>
                    <Col lg={3} md={3} sm={12}>
                        <ParticipantList />
                    </Col>
                    <Col lg={9} md={9} sm={12}>
                        <Button onClick={this.onSendVoteHandler}>Send Vote</Button>
                        <EventPicker />
                    </Col>
                </Row>
                <TimePicker />

            </Container>
        );
    }
}

const maptStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    currentEventName: state.event.eventName,
    currentEventId: state.eventList.selectedEvent,
    selectedVenue: state.event.selectedVenue
});

const mapDispatchToProps = dispatch => {
    return {
        loadCurrentEvent: (event_id) => dispatch(actions.loadSelectedEvent(event_id)),
        sendVote: (event_id, venue) => dispatch(actions.sendVote(event_id, venue)),
        setAlert: (msg, alertType) => dispatch(actions.setAlert(msg, alertType))
    }
};

export default connect(maptStateToProps, mapDispatchToProps)(EventCreator);