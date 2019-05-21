
import React, { Component } from 'react';

import DateTimePicker from 'react-datetime-picker';

class TimePicker extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    render() {
        console.log("date: " + this.state.date);
        return (
            <div>
                <DateTimePicker
                    onChange={this.onChange}
                    value={this.state.date}
                />
            </div>
        );
    }
}

export default TimePicker;