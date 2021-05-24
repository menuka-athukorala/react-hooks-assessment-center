import React from "react";
import DataModal from "./DataModal";
import { Button } from "react-bootstrap";

const AddAndEditProject = ({
  projects,
  setProjects,
  toggle,
  visible,
  editProject,
  setEditProject,
}) => {
  // HANDLE PROJECT SUBMIT
  const handleOnSubmit = (project) => {
    setProjects([project, ...projects]);
  };

  //HANDLE PROJECT UPDATE
  const handleUpdate = (project) => {
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? project : p
    );
    setProjects(updatedProjects);
  };

  return (
    <React.Fragment>
      <Button
        variant="outline-success"
        className="round-border"
        type="button"
        onClick={toggle}
      >
        <i className="fas fa-plus"></i> Add Project
      </Button>

      {visible ? (
        <DataModal
          visible={visible}
          toggle={toggle}
          handleOnSubmit={handleOnSubmit}
          handleUpdate={handleUpdate}
          editProject={editProject || undefined}
          setEditProject={setEditProject}
        />
      ) : null}
    </React.Fragment>
  );
};

export default AddAndEditProject;
