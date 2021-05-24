import React from "react";
import DataModal from "./DataModal";
import useModal from "../hooks/useModal";
import { Button } from "react-bootstrap";

const AddProject = ({ projects, setProjects }) => {
  const { toggle, visible } = useModal();

  const handleOnSubmit = (project) => {
    setProjects([project, ...projects]);
  };

  return (
    <React.Fragment>
      <Button variant="outline-success" className="" type="button" onClick={toggle}>
      <i className="fas fa-plus"></i> Add Project
      </Button>

      {visible ? (
        <DataModal
          visible={visible}
          toggle={toggle}
          handleOnSubmit={handleOnSubmit}
        />
      ) : null}
    </React.Fragment>
  );
};

export default AddProject;
