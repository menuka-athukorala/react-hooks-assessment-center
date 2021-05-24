import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Table, Button } from "react-bootstrap";
import Project from "./Project";

const ProjectTable = ({ projects, setProjects, searchText, onEdit }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [newArray, setNewArray] = useState([]);

  //SEARCH FROM NAME, ADDRESS, TYPE AND CUSTOMER NAME
  useEffect(() => {
    const results = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchText) ||
        project.street.toLowerCase().includes(searchText) ||
        project.city.toLowerCase().includes(searchText) ||
        project.postalCode.toLowerCase().includes(searchText) ||
        project.country.toLowerCase().includes(searchText) ||
        project.type.toLowerCase().includes(searchText) ||
        project.customerName.toLowerCase().includes(searchText)
    );
    setSearchResults(results);
  }, [projects, searchText]);

  // REMOVE PROJECT ONE BY ONE
  const removeProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  //GET ID FROM CHECKED INPUT
  const handlecheckBox = (e, id) => {
    if (e.target.checked) {
      setNewArray((prevArray) => [...prevArray, id]);
    } else {
      setNewArray(newArray.filter((prevArray) => prevArray !== id));
    }
  };

  //DELETE SELECTED PROJECTS
  const deleteSelectedProject = () => {
    const availableProjects = projects.filter(
      (project) => !newArray.includes(project.id)
    );
    setProjects(availableProjects);
    setNewArray([]);
  };

  //UPDATE PROJECT
  const updateProject = (id) => {
    const projectToEdit = projects.find((project) => project.id === id);
    onEdit(projectToEdit);
  };

  return (
    <React.Fragment>
      <Table responsive>
        <thead>
          <tr>
            <th></th>
            <th scope="col">Name</th>
            <th scope="col">Runtime</th>
            <th scope="col">Address</th>
            <th scope="col">Type</th>
            <th scope="col">Customer Name</th>
            <th scope="col">
              {!_.isEmpty(newArray) ? (
                <Button
                  variant="outline-danger"
                  className="btn-custom"
                  onClick={deleteSelectedProject}
                >
                  {" "}
                  Delete All{" "}
                </Button>
              ) : null}
            </th>
          </tr>
        </thead>
        <tbody>
          {searchText === ""
            ? projects.map((project) => (
                <Project
                  key={project.id}
                  {...project}
                  removeProject={removeProject}
                  handlecheckBox={handlecheckBox}
                  updateProject={updateProject}
                />
              ))
            : searchResults.map((project) => (
                <Project
                  key={project.id}
                  {...project}
                  removeProject={removeProject}
                  handlecheckBox={handlecheckBox}
                  updateProject={updateProject}
                />
              ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default ProjectTable;
