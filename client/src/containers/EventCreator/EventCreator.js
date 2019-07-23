import React, { Component } from 'react';
import EventPicker from '../../components/EventPicker/EventPicker';
//import TimePicker from '../components/TimePicker';
import DeadlineTime from '../../components/DeadlineTime/DeadlineTime';
import ParticipantList from '../../components/ParticipantList/ParticipantList';
import FinalEvent from '../../components/FinalEvent/FinalEvent';
import * as actions from '../../store/actions';
import {
    Container,
    Row,
    Col,
    Badge,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './eventCreator.css';



class EventCreator extends Component {

    componentWillMount() {
        const event_id = this.props.currentEventId;
        if (event_id) {
            this.props.loadCurrentEvent(event_id);
        }

        //this.onSetFinalEventHandler();
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

        let voteVenueDisplay = (
            <Col lg={9} md={9} sm={12}>
                {/* <Button onClick={this.onSendVoteHandler}>Send Vote</Button> */}
                <EventPicker />
            </Col>
        );

        let finalEventDisplay = (
            <Col lg={9} md={9} sm={12}>
                <FinalEvent />
            </Col>
        );

        return (
            <Container className="eventCreator">
                <Row>
                    <Col>
                        <div className="currentEventHeader">
                            <h1>{this.props.currentEventName}</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} md={6} sm={12} >
                        <div className="deadlineHeader">
                            <h4>Deadline:<span className="deadlineDate"> <DeadlineTime /> </span></h4>
                        </div>

                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <div className="eventDateHeader">
                            <h4>Event Date: <span>MM/DD/YYYY</span></h4>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3} md={3} sm={12}>
                        <ParticipantList />
                    </Col>
                    {this.props.eventState ? voteVenueDisplay : finalEventDisplay}
                    {/* {voteVenueDisplay} */}

                </Row>

            </Container>
        );
    }
}

const maptStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    currentEventName: state.event.eventName,
    currentEventId: state.eventList.selectedEvent,
    selectedVenue: state.event.selectedVenue,
    deadlineTime: state.event.deadlineTime,
    eventState: state.event.active
});

const mapDispatchToProps = dispatch => {
    return {
        loadCurrentEvent: (event_id) => dispatch(actions.loadSelectedEvent(event_id)),
        sendVote: (event_id, venue) => dispatch(actions.sendVote(event_id, venue)),
        setFinalEvent: (event_id) => dispatch(actions.setFinalEvent(event_id)),
        setAlert: (msg, alertType) => dispatch(actions.setAlert(msg, alertType))
    }
};

export default connect(maptStateToProps, mapDispatchToProps)(EventCreator);