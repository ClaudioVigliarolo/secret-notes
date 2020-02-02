import React from "react";
import classNames from "classnames";
import { Container, Navbar } from "shards-react";

import SearchBar from "./components/SearchBar";
import UserActions from "./components/UserActions";


const classes = classNames("main-navbar", "bg-white", "sticky-top");

export default class TopBar extends React.PureComponent {
  state = {
    userData: this.props.userData,
    searchLoading: false,
    token: this.props.token,
    profileImage: this.props.profileImage
  };

  render() {
    const { userData, token, profileImage } = this.state;
    return (
      <div className={classes} key={userData}>
        <Container className="p-0">
          <Navbar
            type="light"
            className="align-items-stretch flex-md-nowrap p-0"
          >

            <SearchBar handleSearchChange={this.props.handleSearchChange} searchTerm={this.props.searchValue} />
            <UserActions token={token}
              userData={userData} profileImage={profileImage}
            />
          </Navbar>
        </Container>
      </div>
    );
  }
}
