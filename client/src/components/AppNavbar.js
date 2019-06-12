import React, { Component } from 'react';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Alert,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

class AppNavbar extends Component {

    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        const loginSighUp = (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink to="/">
                        <h6 style={{ color: 'white', margin: '5px 8px' }}>Sign In</h6>
                    </NavLink>
                </NavItem>
            </Nav>
        );

        const authorizedLinks = (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink to="/displayEvents" exact>
                        <h6 style={{ color: 'white', margin: '5px 8px' }}>Select Events</h6>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/eventBuilder">
                        <h6 style={{ color: 'white', margin: '5px 8px' }}>Current Event</h6>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/addVenues">
                        <h6 style={{ color: 'white', margin: '5px 8px' }}>Add Venues</h6>
                    </NavLink>
                </NavItem>
                <NavItem onClick={this.props.logout}>
                    <h6 style={{ color: 'white', margin: '5px 8px' }}>Logout</h6>
                </NavItem>
            </Nav>
        );

        const usernameBrand = (<div style={{ color: 'white' }}>@{this.props.username}</div>);

        return (
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <NavbarBrand href="/">Q-Hangout</NavbarBrand>
                {this.props.isAuthenticated ? usernameBrand : null}
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    {!this.props.isAuthenticated ? loginSighUp : authorizedLinks}
                </Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
    loading: state.auth.loading
});

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);

