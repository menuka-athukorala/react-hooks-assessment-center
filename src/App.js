
import React, { useState } from "react";
import { Container, Row } from 'react-bootstrap';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProjectTable from './components/ProjectTable';
import AddAndEditProject from './components/AddAndEditProject';
import SearchProject from './components/SearchProject';
import useLocalStorage from './hooks/useLocalStorage';
import useModal from './hooks/useModal';


function App() {

  const [searchText, setSearchText] = useState("")
  const [projects, setProjects] = useLocalStorage('projects', []);
  const {toggle, visible} = useModal(); 
  const [editProject, setEditProject] = useState(null); 


  return (
    <div className="App">
      <Container>
        <Row className="mt-4">
        <h2 className="p-4">Project Details</h2>
        </Row>
        <Row className="mb-3">
          <div className="col-12 d-inline-flex">
          <SearchProject onChange={ (value) => setSearchText(value) } />
          <AddAndEditProject  projects={projects} setProjects={setProjects} toggle={toggle} visible={visible} editProject={editProject} setEditProject={setEditProject}/>
          </div>

        </Row>
        <ProjectTable projects={projects} setProjects={setProjects} searchText={searchText} onEdit={ (project) => { toggle(); setEditProject(project) }}/>
      </Container>
    </div>
  );
}

export default App;
