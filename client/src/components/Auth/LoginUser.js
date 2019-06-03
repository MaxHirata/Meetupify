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

class LoginUser extends Component {
    state = {
        email: '',
        password: ''
    }




    render() {

        const onChange = (event) => {
            this.setState({ [event.target.name]: event.target.value });
        }


        const onSubmit = () => {

            const loginUser = {
                email: this.state.email,
                password: this.state.password
            }

            if (this.state.password1 !== this.state.password2) {
                console.log("Error: Passwords DO NOT Match");
            } else {
                console.log(loginUser);
            }
        }

        return (
            <Container>
                <Label for="loginForm">Login Credentials</Label>
                <Form>
                    <Row md={6}>
                        <FormGroup>
                            <Label for="loginEmail">Login Email</Label>
                            <Input type="email" name="email" value={this.state.email} onChange={e => onChange(e)} placeholder="Login with Email" />
                        </FormGroup>
                    </Row>
                    <Row md={6}>
                        <FormGroup>
                            <Label for="loginPassword">Password</Label>
                            <Input type="password" name="password" value={this.state.password} onChange={e => onChange(e)} placeholder="Password" />
                        </FormGroup>

                    </Row>
                    <Button color="danger" onClick={onSubmit} >Login</Button>
                </Form>
            </Container>
        )
    }
}

export default LoginUser;