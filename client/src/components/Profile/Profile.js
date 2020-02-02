import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./PageTitle";
import UserAvatar from "./UserAvatar";
import UserDetails from "./UserDetails";





const UserProfileLite = (props) => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="4">
        <UserAvatar userData={props.userData} token={props.token} profileImage={props.profileImage} changeAvatar={props.changeAvatar} />
      </Col>
      <Col lg="8">
        <UserDetails userData={props.userData} token={props.token} updateChanges={props.updateChanges} />
      </Col>
    </Row>
  </Container>
);

export default UserProfileLite;
