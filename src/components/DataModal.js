import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const DataModal = (props) => {
  
  const [project, setProject] = useState(() => {
    return {
      name: props.project ? props.project.name : "",
      runTime: props.project ? props.project.runTime : "",
      street: props.project ? props.project.street : "",
      city: props.project ? props.project.city : "",
      postalCode: props.project ? props.project.postalCode : "",
      country: props.project ? props.project.country : "",
      type: props.project ? props.project.type : "",
      customerName: props.project ? props.project.customerName : "",
    };
  });

  const [errorMsg, setErrorMsg] = useState("");
  const { name, runTime, street, city, postalCode, country, type, customerName } = project;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [name, runTime, street, city, postalCode, country, type, customerName];
    let errorMsg = "";

  
    // CHECK ALL FIELDS ARE FILLED
    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      const project = {
        id: uuidv4(),
        name,
        runTime,
        street,
        city,
        postalCode,
        country,
        type,
        customerName,
      };
      props.handleOnSubmit(project);
      props.toggle();
    } else {
      errorMsg = "Please fill out all the fields.";
    }
    setErrorMsg(errorMsg);
    setProject({
      name: "",
      runTime: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
      type: "",
      customerName: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal
      show={props.visible}
      onHide={props.toggle}
      backdrop="static"
      keyboard={false}
      animation={true}
      dialogClassName="text"
    >
      <Modal.Header closeButton>
        <Modal.Title>Project Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form Starts */}
        <div className="main-form">
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <Form onSubmit={handleOnSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Project Name:</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                name="name"
                value={name}
                placeholder="Enter project name"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="runTime">
              <Form.Label>Runtime:</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                name="runTime"
                value={runTime}
                placeholder="Enter runtime"
                onChange={handleInputChange}
              />
            </Form.Group>
<Form.Row>
            <Form.Group as={Col} controlId="street">
              <Form.Label>Street Address:</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                name="street"
                value={street}
                placeholder="Enter the street"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="city">
              <Form.Label>City:</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                name="city"
                value={city}
                placeholder="Enter the city"
                onChange={handleInputChange}
              />
              
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} controlId="postalCode">
              <Form.Label>Postal Code:</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                name="postalCode"
                value={postalCode}
                placeholder="Enter the Postal Code"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="country">
              <Form.Label>Country:</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                name="country"
                value={country}
                placeholder="Enter the Country"
                onChange={handleInputChange}
              />
            </Form.Group>
            </Form.Row>
<Form.Row>
            <Form.Group as={Col} controlId="type">
              <Form.Label>Type:</Form.Label>
              <Form.Control
                name="type"
                as="select"
                defaultValue="Select Type"
                onChange={handleInputChange}
              >
                <option disabled hidden>
                  Select Type
                </option>
                <option value="StructuralEngineering">
                  Structural Engineering
                </option>
                <option value="CivilEngineering">Civil Engineering</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="customerName">
              <Form.Label>Customer Name:</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                name="customerName"
                value={customerName}
                placeholder="customer Name"
                onChange={handleInputChange}
              />
            </Form.Group>
            </Form.Row>
            <Form.Row className="float-right my-2">
            <Button variant="outline-light" type="submit" className="btn-custom mr-2">
              Submit
            </Button>
            <Button variant="secondary" className="round-border" onClick={props.toggle}>
              Close
            </Button>
            </Form.Row>

          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DataModal;
