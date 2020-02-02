import React from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";


export default function (props) {
  return (
    <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
      <InputGroup seamless className="ml-3">
        <InputGroupAddon type="prepend">
          <InputGroupText>
            <i className="material-icons">search</i>
          </InputGroupText>
        </InputGroupAddon>
        <FormInput
          onChange={props.handleSearchChange}
          value={props.searchValue}
          className="navbar-search"
          placeholder="Search In Your Notes..."
        />
      </InputGroup>
    </Form>
  )
}

