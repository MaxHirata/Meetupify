import React, { Component } from 'react';
import {
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class createEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            closeAll: false,
            eventName: "",
            eventDate: null,
            eventDeadline: null
        };

        this.toggle = this.toggle.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    toggleAll() {
        this.setState({
            closeAll: true
        });
    }

    onHandleSetEventName = (e) => {
        this.setState({ eventName: e.target.value });
    }

    onHandleSetEventDate = (e) => {
        this.setState({ eventDate: e.target.value });
    }

    onHandleSetEventDeadline = (e) => {
        this.setState({ eventDeadline: e.target.value });
    }

    createEventHandler = () => {



        if (this.state.eventName !== "" && this.state.eventDate && this.state.eventDeadline) {
            const currentDate = new Date();
            const eventDate = new Date(this.state.eventDate);
            const eventDeadline = new Date(this.state.eventDeadline);

            if (eventDate > currentDate && eventDeadline > currentDate && eventDate > eventDeadline) {

                const eventData = {
                    eventName: this.state.eventName,
                    deadlineTime: this.state.eventDeadline,
                    eventDate: this.state.eventDate
                }

                this.props.createEvent(eventData);
                this.props.setAlert("New Event has been Created!", "success");
            } else {

                if (eventDeadline < currentDate) {
                    this.props.setAlert("Event Deadline cannot be BEFORE the CURRENT date", "danger");
                }

                if (eventDate < currentDate) {
                    this.props.setAlert("Event Date cannote be BEFORE the CURRENT date", "danger");
                }

                if (eventDate < eventDeadline) {
                    this.props.setAlert("The Event Date cannot be BEFORE the event Deadline", "danger");
                }
            }


        } else {
            if (this.state.eventName === "") {
                this.props.setAlert("Event Name has NOT been declared", "danger");
            }

            if (this.state.eventDate === null) {
                this.props.setAlert("Event Date has NOT been declared", "danger");
            }

            if (this.state.eventDate === null) {
                this.props.setAlert("Event Date has NOT been declared", "danger");
            }

        }

        this.toggle();
    }


    render() {
        return (
            <Container>
                <Button color="danger" onClick={this.toggle}>Add New Event</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Create New Event</ModalHeader>

                    <ModalBody>

                        <Form>
                            <FormGroup>
                                <Label>Event Name</Label>
                                <Input
                                    type="text"
                                    name="eventName"
                                    value={this.state.eventName}
                                    onChange={e => this.onHandleSetEventName(e)}
                                    placeholder="Input a name for your Event" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Event Date</Label>
                                <Input
                                    type="date"
                                    name="eventDate"
                                    value={this.state.eventDate}
                                    onChange={e => this.onHandleSetEventDate(e)}
                                    placeholder="Date for Event" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Event Deadline</Label>
                                <Input
                                    type="date"
                                    name="eventDeadline"
                                    value={this.state.eventDeadline}
                                    onChange={e => this.onHandleSetEventDeadline(e)}
                                    placeholder="Votes can be submitted until deadline" />
                            </FormGroup>
                        </Form>

                        <p>Event Name: {this.state.eventName}</p>
                        <p>Event Date: {this.state.eventDate}</p>
                        <p>Event Deadline: {this.state.eventDeadline}</p>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createEventHandler}>Create Event</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Container>


        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createEvent: (eventData) => dispatch(actions.createEvent(eventData)),
        setAlert: (msg, alertType) => dispatch(actions.setAlert(msg, alertType))
    }
};

export default connect(null, mapDispatchToProps)(createEvent);