import React from "react";
import "./style.scss";

import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardHeader
} from 'reactstrap';
class EmojiBox extends React.Component {

    get_time_diff = (datetime) => {
        datetime = new Date(datetime).getTime();
        var now = new Date().getTime();
        var milisec_diff = 0;
        if (isNaN(datetime)) {
            return "";
        }
        if (datetime < now) {
            milisec_diff = now - datetime;
        } else {
            milisec_diff = datetime - now;
        }

        var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
        return days
    }

    relativeTime = (faceDate) => {
        var daysDiff = this.get_time_diff(faceDate);
        if (daysDiff > 6) {
            return faceDate
        }
        else if (daysDiff === 0) {
            return "Today";
        } else {
            return daysDiff + " days ago";
        }
    }
    render() {
        const { face } = this.props;
        return (
            <div style={{ color: "white" }}>
                <Card>
                    <CardHeader style={{ fontSize: `${face.size}px` }}>{face.face}</CardHeader>
                    <CardBody>
                        <CardTitle>{face.id}</CardTitle>
                        <CardSubtitle>{`Size : ${face.size}`}</CardSubtitle>
                        <CardSubtitle>{`Price : $${face.price / 100}`}</CardSubtitle>
                        <CardText>{`Post Date :  ${this.relativeTime(face.date)}`}</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
            </div>
        );
    }

}
export default EmojiBox;
