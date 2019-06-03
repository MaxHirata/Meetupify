import React, { Component } from 'react';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    FormText,
    Button

} from 'reactstrap';
import axios from 'axios';

class RegisterUser extends Component {
    state = {
        username: '',
        email: '',
        password1: '',
        password2: ''
    }



    render() {

        const onChange = (event) => {
            this.setState({ [event.target.name]: event.target.value });
        }

        const onSubmit = async () => {

            if (this.state.password1 !== this.state.password2) {
                console.log("Error: Passwords DO NOT Match");
            } else {

                const newUser = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password1
                }
                console.log(newUser);

                try {
                    const config = {
                        headers: {
                            'Content-type': 'application/json'
                        }
                    };

                    const body = JSON.stringify(newUser);

                    const res = await axios.post('/api/user', body, config);
                    console.log(res.data);
                } catch (err) {
                    console.error(err.response.data);
                }
            }
        }

        return (
            <Container>
                <h3>Username: {this.state.username}</h3>
                <h3>Email: {this.state.email}</h3>
                <Label>Register New User</Label>
                <Form>
                    <Row>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input type="text" name="username" value={this.state.username} onChange={e => onChange(e)} placeholder="Enter Username" />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Label>Registration Email</Label>
                            <Input type="email" name="email" value={this.state.email} onChange={e => onChange(e)} placeholder="Enter Email" />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Label>Enter New Password</Label>
                            <Input type="password" name="password1" value={this.state.password1} onChange={e => onChange(e)} placeholder="Password" />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Label>Verify Password</Label>
                            <Input type="password" name="password2" value={this.state.password2} onChange={e => onChange(e)} placeholder="Verify Password" />
                        </FormGroup>
                    </Row>
                    <Button color="danger" onClick={onSubmit}>Sign Up</Button>
                </Form>
            </Container>
        )
    }
}

export default RegisterUser;