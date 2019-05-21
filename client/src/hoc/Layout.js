import React, { Component } from 'react';
import AppNavBar from '../components/AppNavbar';

class Layout extends Component {
    state = {
        isAuthenticated: true,
        hostAccount: true
    }

    render() {
        return (
            <div>
                <AppNavBar />
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;