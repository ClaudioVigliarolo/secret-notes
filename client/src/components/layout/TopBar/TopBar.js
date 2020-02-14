import React from "react";
import { Container, Navbar } from "shards-react";
import classNames from "classnames";
import SearchBar from "./components/SearchBar";
import UserActions from "./components/UserActions";

const classes = classNames("main-navbar", "bg-white", "sticky-top");

export default function TopBar(props) {
  return (
    <div className={classes} >
      <Container className="p-0">
        <Navbar
          type="light"
          className="align-items-stretch flex-md-nowrap p-0"
        >

          <SearchBar handleSearchChange={props.handleSearchChange} searchTerm={props.searchValue} />
          <UserActions token={props.token}
            userData={props.userData} profileImage={props.profileImage}
          />
        </Navbar>
      </Container>
    </div>
  )
}