
import React from "react";
// reactstrap components
import { Row, Col, FormGroup, Label, Input, Nav } from "reactstrap";

import "./style.scss";


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { bgColor, onSortChanged } = this.props;
        return (
            <div className="sidebar" data={bgColor}>
                <div className="sidebar-wrapper" ref="sidebar">
                    <Nav>
                        <FormGroup>
                            <Label for="exampleSelect">Sort By</Label>
                            <Input type="select" name="select" id="exampleSelect" onChange={(e, el) => {
                                onSortChanged(e.target.value);
                            }}>
                                <option>id</option>
                                <option>size</option>
                                <option>price</option>
                            </Input>
                        </FormGroup>
                    </Nav>
                </div>
            </div>
        );
    }
}



export default Sidebar;
