import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
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
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <NavbarBrand href="/">Q-Hangout</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/login">
                                    <h6 style={{ color: 'white', margin: '5px 8px' }}>Sign In</h6>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/" exact>
                                    <h6 style={{ color: 'white', margin: '5px 8px' }}>Choose/Create Events</h6>
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
                            <NavItem>
                                <a href="https://github.com/MaxHirata">My Github</a>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     //isAuthenticated: state.isAuthenticated
// };

export default AppNavbar;

