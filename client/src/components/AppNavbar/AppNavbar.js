import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import './appNavbar.css'

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

                {/* <NavItem>
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
                </NavItem> */}

            </Nav>
        );

        const eventBuilderLink = (
            <NavItem>
                <NavLink to="/eventBuilder">
                    <h6 style={{ color: 'white', margin: '5px 8px' }}>Current Event</h6>
                </NavLink>
            </NavItem>
        );


        const authorizedLinks = (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink to="/displayEvents" exact>
                        <h6 style={{ color: 'white', margin: '5px 8px' }}>Select Events</h6>
                    </NavLink>
                </NavItem>

                {this.props.selectedEventId != null ? eventBuilderLink : null}

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

        const usernameBrand = (<div className="username">@{this.props.username}</div>);

        return (
            <Navbar color="dark" dark expand="sm" className="mb-4">
                <NavbarBrand style={{ color: "rgb(149, 0, 254)", "font-weight": "bolder" }} className="app-name" href="/">Meetupify</NavbarBrand>
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
    loading: state.auth.loading,
    selectedEventId: state.eventList.selectedEvent
});

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);

