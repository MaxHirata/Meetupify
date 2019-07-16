import React, { Component } from 'react';
import {
    Container,
    Button,
    ButtonGroup

} from 'reactstrap';
import LoginUser from '../../components/Auth/LoginUser';
import RegisterUser from '../../components/Auth/RegisterUser';

class Auth extends Component {
    state = {
        isLogin: true //switch between Login or Register Forms
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin };
        });
    }

    render() {

        return (
            <Container>
                <ButtonGroup>
                    <Button color={this.state.isLogin ? 'primary' : 'secondary'} onClick={this.switchAuthModeHandler}>Login</Button>
                    <Button color={!this.state.isLogin ? 'primary' : 'secondary'} onClick={this.switchAuthModeHandler}>Register User</Button>
                </ButtonGroup>

                {this.state.isLogin ? <LoginUser /> : <RegisterUser />}
            </Container>
        )
    }
}

export default Auth;