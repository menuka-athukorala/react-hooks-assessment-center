import React from "react";
import { Button } from "react-bootstrap";

const Project = ({
  id,
  name,
  startDate,
  endDate,
  street,
  city,
  postalCode,
  country,
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
        {startDate} - {endDate}
      </td>
      <td>
        {street}, {city}, {postalCode}, {country}
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
