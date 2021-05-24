import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const DataModal = (props) => {
  const [buttonTitle, setButtonTitle] = useState("Submit");
  const [isEditing, setIsEditing] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  const [project, setProject] = useState(() => {
    if (props.editProject) {
      setButtonTitle("Update"); // set Button title
      setIsEditing(true); // set isEditing
      return {
        name: props.editProject ? props.editProject.name : "",
        runTime: props.editProject ? props.editProject.runTime : "",
        street: props.editProject ? props.editProject.street : "",
        city: props.editProject ? props.editProject.city : "",
        postalCode: props.editProject ? props.editProject.postalCode : "",
        country: props.editProject ? props.editProject.country : "",
        type: props.editProject ? props.editProject.type : "",
        customerName: props.editProject ? props.editProject.customerName : "",
      };
    } else {
      setButtonTitle("Submit");
      setIsEditing(false);
      return {
        name: props.project ? props.project.name : "",
        runTime: props.project ? props.project.runTime : "",
        street: props.project ? props.project.street : "",
        city: props.project ? props.project.city : "",
        postalCode: props.project ? props.project.postalCode : "",
        country: props.project ? props.project.country : "",
        type: props.project ? props.project.type : "Select Type",
        customerName: props.project ? props.project.customerName : "",
      };
    }
  });

  const [errorMsg, setErrorMsg] = useState("");
  const {
    name,
    runTime,
    street,
    city,
    postalCode,
    country,
    type,
    customerName,
  } = project;

  // HANDLE CLOSE BUTTON AND HEADER CLOSE BUTTON
  const onClose = () => {
    props.setEditProject(null);
    props.toggle();
  };

  // HANDLE BOTH ADD AND UPDATE
  const handleSubmitAndUpdate = (event) => {
    event.preventDefault();
    const values = [
      name,
      runTime,
      street,
      city,
      postalCode,
      country,
      type,
      customerName,
    ];
    let errorMsg = "";


    // CHECK ALL FIELDS ARE FILLED
    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      const project = {
        id: isEditing ? props.editProject.id : uuidv4(),
        name,
        runTime,
        street,
        city,
        postalCode,
        country,
        type,
        customerName,
      };

      // if it is an edit then update else add as a new project
      if (isEditing) {
        props.handleUpdate(project);
      } else {
        props.handleOnSubmit(project);
      }
      props.toggle();
      props.setEditProject(null);
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
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>Project Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form Starts */}
        <div className="main-form">
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <Form onSubmit={handleSubmitAndUpdate}>
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
              {/* <DatePicker
                name="runTime"
                value={runTime}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              /> */}
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
                  defaultValue={type}
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
              <Button
                variant="outline-light"
                type="submit"
                className="btn-custom mr-2"
              >
                {buttonTitle}
              </Button>
              <Button
                variant="secondary"
                className="round-border"
                onClick={onClose}
              >
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
