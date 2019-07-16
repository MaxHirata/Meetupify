import React from 'react';
import {
    ListGroupItem,
    Button
} from 'reactstrap';

const participantItem = (props) => {

    let auth = true;

    let removeButton = (
        <Button outline color="danger" size="sm">Remove</Button>
    );

    return (
        <ListGroupItem key={props.key}>
            @{props.username}
            {/* {auth ? removeButton : null} */}
        </ListGroupItem>
    );
}

export default participantItem;