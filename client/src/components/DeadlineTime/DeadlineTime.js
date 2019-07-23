import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
//import * as actions from '../../store/actions/index';

class deadlineTime extends Component {

    render() {

        let deadlineStr = this.props.deadlineTime;

        return (
            <Fragment>
                {deadlineStr ? deadlineStr.substr(0, 10) : null}
            </Fragment>

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