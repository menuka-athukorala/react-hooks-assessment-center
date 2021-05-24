import React from "react";
import { Form } from "react-bootstrap";

const SearchProject = (props) => {
  // GET THE SEARCH TERM
  const onChangeValue = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <React.Fragment>
      <Form inline>
          <Form.Control
            type="text"
            onChange={onChangeValue}
            placeholder="Search"
            className="mr-sm-2"
          />
      </Form>
    </React.Fragment>
  );
};

export default SearchProject;
