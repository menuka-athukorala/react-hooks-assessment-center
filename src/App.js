import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProjectTable from './components/ProjectTable';
import AddProject from './components/AddProject';
import SearchProject from './components/SearchProject';
import useLocalStorage from './hooks/useLocalStorage';
import React, { useState } from "react";
import { Container, Row } from 'react-bootstrap';

function App() {

  const [searchText, setSearchText] = useState("")
  const [projects, setProjects] = useLocalStorage('projects', []);


  return (
    <div className="App">
      <Container>
        <Row className="mt-5">
        <h2 className="py-5">Project Details</h2>
        </Row>
        <Row className="mb-3">
          <SearchProject onChange={ (value) => setSearchText(value) } />
          <AddProject  projects={projects} setProjects={setProjects} />
        </Row>
          <ProjectTable projects={projects} setProjects={setProjects} searchText={searchText}/>
      </Container>
    </div>
  );
}

export default App;
