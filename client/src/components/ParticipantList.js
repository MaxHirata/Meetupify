import React, { Component } from 'react';
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
import ParticipantItem from './ParticipantItem';
import uuid from 'uuid';

class ParticipantList extends Component {

    state = {
        participants: ["Trever", "Sandy", "Ryan", "Max", "Evan"]
    }

    render() {
        return (
            <ListGroup>
                <ListGroupItem active>
                    <ListGroupItemHeading>Event Participants</ListGroupItemHeading>
                    <ListGroupItemText>Add Participant's Username to Event for Voting</ListGroupItemText>
                </ListGroupItem>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <Input placeholder="username" />
                    <InputGroupAddon addonType="append">
                        <Button color="secondary">Add</Button></InputGroupAddon>
                </InputGroup>
                {
                    this.state.participants.map(participant => (
                        <ParticipantItem
                            username={participant}
                            key={uuid} />
                    ))
                }
            </ListGroup>);
    }
};

export default ParticipantList;

