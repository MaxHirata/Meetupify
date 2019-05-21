import React from 'react';
import {
    Container,
    Media,
    Button,
    Card,
    CardImg,
    CardTitle,
    CardText,
    CardSubtitle,
    CardBody
} from 'reactstrap';

const venueItem = (props) => {

    return (
        <Card>
            <CardImg top width="200px" height="250px" src={props.image} />
            <CardBody>
                <CardTitle>
                    <h5>{props.name}</h5>
                </CardTitle>
                <CardSubtitle><h6>{props.location}</h6></CardSubtitle>
                <CardText>Rating: {props.rating}</CardText>
                <CardText>Price: {props.price}</CardText>
                <Button color="danger" onClick={() => props.selectVenue(props)}>Select</Button>
            </CardBody>
        </Card>
    );
}

export default venueItem;