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
import './venueItem.css';

/** Bootstrap Style Override */
const cardBorder = {
    "border-radius": ".5em",
    "border": "3px solid rgba(95, 95, 95, 0.692)"
}
/**-------------------------- */

const venueItem = (props) => {
    return (
        <Card className="venueCard" style={cardBorder}>
            <CardImg top width="auto" height="200px" src={props.image} />
            <CardBody style={{ padding: "0.3rem 0.3rem 0.5rem 0.3rem" }}>
                <CardTitle>
                    <h5 className="venueName">{props.name}</h5>
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