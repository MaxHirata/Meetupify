
import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

const AlertBar = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        // <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        //     {alert.msg}
        // </div>
        <Alert key={alert.id} color={alert.alertType}>
            {alert.msg}
        </Alert>
    ));

// Alert.propTypes = {
//   alerts: PropTypes.array.isRequired
// };

const mapStateToProps = state => ({
    alerts: state.alerts
});


// Alert.propTypes = {
//     alerts: PropTypes.array.isRequired
// };


export default connect(mapStateToProps)(AlertBar);