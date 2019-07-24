import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button,

} from 'reactstrap';
import ParticipantItem from '../ParticipantItem/ParticipantItem';
import uuid from 'uuid';
import './participantList.css';

/** Bootstrap Override Styling */
const participantList = {
    "border": "2pt solid rgba(128, 128, 128, 0.692)",
    "background-color": "rgb(226, 220, 182)"
}

const list_group_itemHeading_override = {
    "padding": "0",
    "margin": "0"
}
/**--------------------------- */

class ParticipantList extends Component {

    state = {
        newParticipant: ""
    }

    render() {

        const onChange = (event) => {
            this.setState({ newParticipant: event.target.value });
        }

        const onSubmitNewParticipant = () => {
            if (this.props.participants.includes(this.state.newParticipant)) {
                this.props.setAlert("Username is Already Exists in Participants", "danger");
            } else {
                this.props.setAlert("New Participant Added!", "success");
                this.props.addParticipant(this.props.event_id, this.state.newParticipant);
            }
        }

        return (


            <ListGroup>
                <ListGroupItem style={participantList}>
                    <ListGroupItemHeading style={list_group_itemHeading_override}><span id="title">Participants</span></ListGroupItemHeading>
                </ListGroupItem>

                <InputGroup>
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <Input placeholder="username" onChange={e => onChange(e)} />
                    <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={onSubmitNewParticipant}>Add</Button>
                    </InputGroupAddon>
                </InputGroup>
                {
                    this.props.participants.map(participant => (
                        <ParticipantItem
                            username={participant}
                            key={uuid} />
                    ))
                }
            </ListGroup>

        );
    }
};

const mapStateToProps = state => ({
    event_id: state.eventList.selectedEvent,
    participants: state.event.participants
});

const mapDispatchToProps = dispatch => {
    return {
        addParticipant: (event_id, participant_username) => dispatch(actions.addParticipant(event_id, participant_username)),
        setAlert: (message, alertType) => dispatch(actions.setAlert(message, alertType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);

