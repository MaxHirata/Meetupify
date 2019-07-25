import React, { Component } from 'react';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Button

} from 'reactstrap';
import './auth.css';
import logo from '../../resources/Q-Hangout-Logo.png';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alerts';
import { register } from '../../store/actions/auth';


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
                this.props.setAlert('Passwords Do Not Match...', 'danger');
                console.log("Error: Passwords DO NOT Match");
            } else {


                //this.props.register(this.state.username, this.state.email, this.state.password1);

                const newUser = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password1
                }
                this.props.register(newUser);
                this.props.setAlert('New User is Now Regiserted', 'success');

                // console.log(newUser);

                // try {
                //     const config = {
                //         headers: {
                //             'Content-type': 'application/json'
                //         }
                //     };

                //     const body = JSON.stringify(newUser);

                //     const res = await axios.post('/api/user', body, config);
                //     console.log(res.data);
                // } catch (err) {
                //     console.error(err.response.data);
                // }
            }
        }

        if (this.props.isAuthenticated) {
            return <Redirect to="/DisplayEvents" />
        }

        return (
            <Container>
                <div className="authForm">
                    <img src={logo} width="200px" />
                    <Form>
                        <Row>
                            <div className="authFormInput">
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input type="text" name="username" value={this.state.username} onChange={e => onChange(e)} placeholder="Enter Username" />
                                </FormGroup>
                            </div>

                        </Row>
                        <Row>
                            <div className="authFormInput">
                                <FormGroup>
                                    <Label>Registration Email</Label>
                                    <Input type="email" name="email" value={this.state.email} onChange={e => onChange(e)} placeholder="Enter Email" />
                                </FormGroup>
                            </div>

                        </Row>
                        <Row>
                            <div class="authFormInput">
                                <FormGroup>
                                    <Label>Enter New Password</Label>
                                    <Input type="password" name="password1" value={this.state.password1} onChange={e => onChange(e)} placeholder="Password" />
                                </FormGroup>
                            </div>

                        </Row>
                        <Row>
                            <div className="authFormInput">
                                <FormGroup>
                                    <Label>Verify Password</Label>
                                    <Input type="password" name="password2" value={this.state.password2} onChange={e => onChange(e)} placeholder="Verify Password" />
                                </FormGroup>
                            </div>

                        </Row>
                        <Button color="secondary" onClick={onSubmit}>Sign Up</Button>
                    </Form>
                </div>

            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, { setAlert, register })(RegisterUser);