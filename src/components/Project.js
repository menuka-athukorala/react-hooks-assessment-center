import React from "react";
import { Button } from "react-bootstrap";

const Project = ({
  id,
  name,
  runtime,
  address,
  type,
  customerName,
  handlecheckBox,
  updateProject,
  removeProject,
}) => {
  // BIND TABLE VALUE
  return (
    <tr>
      <td>
        <input type="checkbox" onChange={(e) => handlecheckBox(e, id)} />
      </td>
      <td>{name}</td>
      <td>
        {runtime.startDate} - {runtime.endDate}
      </td>
      <td>
        {address.streetAddress}, {address.city}, {address.postalCode},{" "}
        {address.country}
      </td>
      <td>{type}</td>
      <td>{customerName}</td>
      <td>
        <Button
          variant="outline-secondary"
          type="button"
          className="btn-custom-icon"
          onClick={() => updateProject(id)}
        >
          <i className="fas fa-pen-alt"></i>
        </Button>{" "}
        <Button
          variant="outline-danger"
          className="btn-custom-icon"
          onClick={() => removeProject(id)}
        >
          <i className="fas fa-trash-alt"></i>
        </Button>
      </td>
    </tr>
  );
};

export default Project;
