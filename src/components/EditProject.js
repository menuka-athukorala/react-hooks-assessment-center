import React from "react";
import DataModal from "./DataModal";
import useModal from "../hooks/useModal";
import { Button } from "react-bootstrap";

const EditProject = ({ projects, setProjects, updateInfo }) => {
  const { toggle, visible } = useModal();

  const projectEdit = projects.find((project) => project.id === updateInfo.id);
  console.log("edit:", projectEdit)

  const handleOnSubmit = (project) => {
      const filteredProject = projects.filter((project) => project.id !== updateInfo.id);
    setProjects([project, ...filteredProject]);
  };

  return (
    <React.Fragment>
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

export default EditProject;
