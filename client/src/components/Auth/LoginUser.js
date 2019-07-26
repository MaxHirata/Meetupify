import React, { Component } from 'react';
import {
    Container,
    Form,
    Col,
    Row,
    FormGroup,
    Label,
    Input,
    FormText,
    Button

} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/auth';
import './auth.css';
import logo from '../../resources/meetupify-logo.png';

class LoginUser extends Component {
    state = {
        email: 'testPerson@gmail.com',
        password: 'test222'
    }

    render() {

        const onChange = (event) => {
            this.setState({ [event.target.name]: event.target.value });
        }


        const onSubmit = () => {

            const loginUserData = {
                email: this.state.email,
                password: this.state.password
            }

            this.props.loginUser(loginUserData);
        }

        if (this.props.isAuthenticated) {
            return <Redirect to="/DisplayEvents" />
        }

        return (
            <Container>
                <div className="authForm">
                    <img src={logo} width="200px" />
                    <Form>
                        <Row md={6}>
                            <div className="authFormInput">
                                <FormGroup>
                                    <Label for="loginEmail">Login Email</Label>
                                    <Input type="email" name="email" value={this.state.email} onChange={e => onChange(e)} placeholder="Login with Email" />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row md={6}>
                            <div className="authFormInput">
                                <FormGroup>
                                    <Label for="loginPassword">Password</Label>
                                    <Input type="password" name="password" value={this.state.password} onChange={e => onChange(e)} placeholder="Password" />
                                </FormGroup>
                            </div>

                        </Row>
                        <Button color="secondary" onClick={onSubmit} >Login</Button>{' '}
                    </Form>
                </div>

            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loginUser })(LoginUser);