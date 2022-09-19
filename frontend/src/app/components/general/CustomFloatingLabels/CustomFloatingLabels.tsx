import React from "react";
import {observer} from "mobx-react-lite";
import { FloatingLabel, Form } from "react-bootstrap";

export default observer(()=>{
    return(
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
            >
                <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
        </>
    )
});