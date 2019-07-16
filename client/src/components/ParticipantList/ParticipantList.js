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
                <ListGroupItem active>
                    <ListGroupItemHeading>Event Participants</ListGroupItemHeading>
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

