import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import * as actions from '../store/actions/index';

class deadlineTime extends Component {


    render() {

        return (
            <h2><Badge color="secondary">{(this.props.deadlineTime)}</Badge></h2>

        );
    }
}

const mapStateToProps = state => ({
    deadlineTime: state.event.deadlineTime,
    currentEventId: state.eventList.selectedEvent
});

// const mapStateToDispatch = dispatch => {
//     return {
//         setFinalEvent: (event_id) => dispatch(actions.setFinalEvent(event_id))
//     };
// }

export default connect(mapStateToProps, null)(deadlineTime);