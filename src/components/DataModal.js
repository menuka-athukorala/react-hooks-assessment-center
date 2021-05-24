import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const DataModal = (props) => {
  const [buttonTitle, setButtonTitle] = useState("Submit");
  const [isEditing, setIsEditing] = useState(false);

  const [project, setProject] = useState(() => {
    if (props.editProject) {
      setButtonTitle("Update");
      setIsEditing(true);
    } else {
      setButtonTitle("Submit");
      setIsEditing(false);
    }
    return {
      name: props.editProject ? props.editProject.name : "",
      runtime: {
        startDate: props.editProject ? props.editProject.runtime.startDate : "",
        endDate: props.editProject ? props.editProject.runtime.endDate : "",
      },
      address: {
        streetAddress: props.editProject
          ? props.editProject.address.streetAddress
          : "",
        city: props.editProject ? props.editProject.address.city : "",
        postalCode: props.editProject
          ? props.editProject.address.postalCode
          : "",
        country: props.editProject ? props.editProject.address.country : "",
      },
      type: props.editProject ? props.editProject.type : "Select Type",
      customerName: props.editProject ? props.editProject.customerName : "",
    };
  });

  const [errorMsg, setErrorMsg] = useState("");
  const { name, runtime, address, type, customerName } = project;

  // HANDLE CLOSE BUTTON AND HEADER CLOSE BUTTON
  const onClose = () => {
    props.setEditProject(null);
    props.toggle();
  };

  // HANDLE BOTH ADD AND UPDATE
  const handleSubmitAndUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const values = [
      data.get("name"),
      data.get("runtime.startDate"),
      data.get("runtime.endDate"),
      data.get("address.streetAddres"),
      data.get("address.city"),
      data.get("address.postalCode"),
      data.get("address.country"),
      data.get("type"),
      data.get("customerName"),
    ];
    let errorMsg = "";

    // CHECK ALL FIELDS ARE FILLED
    const allFieldsFilled = values.every((field, index) => {
      let value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      const project = {
        id: isEditing ? props.editProject.id : uuidv4(),
        name,
        runtime: {
          startDate: values[1],
          endDate: values[2],
        },
        address: {
          streetAddress: values[3],
          city: values[4],
          postalCode: values[5],
          country: values[6],
        },
        type,
        customerName,
      };

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
      runtime: {
        startDate: "",
        endDate: "",
      },
      address: {
        streetAddress: "",
        city: "",
        postalCode: "",
        country: "",
      },
      type: "Select Type",
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
      animation={false}
      show={props.visible}
      onHide={props.toggle}
      backdrop="static"
      keyboard={false}
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
            <Form.Row>
              <Form.Group as={Col} controlId="runtime.startDate">
                <Form.Label>Project Run Time: </Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="runtime.startDate"
                  defaultValue={runtime.startDate}
                  placeholder=" Start Date (DD/MM/YY)"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="runtime.endDate">
                <Form.Label></Form.Label>
                <Form.Control
                  className="input-control mt-2"
                  type="text"
                  name="runtime.endDate"
                  defaultValue={runtime.endDate}
                  placeholder="End Date (DD/MM/YY)"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="address.streetAddres">
                <Form.Label>Street Address:</Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="address.streetAddres"
                  defaultValue={address.streetAddress}
                  placeholder="Enter the street"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="address.city">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="address.city"
                  defaultValue={address.city}
                  placeholder="Enter the city"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="address.postalCode">
                <Form.Label>Postal Code:</Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="address.postalCode"
                  defaultValue={address.postalCode}
                  placeholder="Enter the Postal Code"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="address.country">
                <Form.Label>Country:</Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="address.country"
                  defaultValue={address.country}
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
