import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from 'shards-react';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../../api/api';
import Avatar from 'react-avatar';

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      userData: this.props.userData,
      token: this.props.token,
      profileImage: this.props.profileImage
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  onUserLogout = () => {
    logoutUser(this.state.token).then(() => this.props.history.push('/login'));
  };

  renderProfileImage = image => {
    return image ? (
      <div className="container-profile-avatar-small">
        <img alt="profile-avatar"
          src={`${image}`}
          className="profile-avatar-small"
        /></div>
    ) : (

        <Avatar
          name={this.state.userData.firstName}
          round={true}
          size={40}
          className="rounded-circle mr-2"
        />

      );

  };

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions} >
        <div className="profile-top">
          {this.state.userData &&
            this.renderProfileImage(this.state.profileImage)}{' '}
          <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
            <span className="d-none d-md-inline-block">
              {this.state.userData && this.state.userData.firstName}
            </span>
          </DropdownToggle>
        </div>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to={`${this.props.match.path}/profile`}>
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to={`${this.props.match.path}`}>
            <i className="material-icons">&#xE896;</i> My Notes
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            tag={Link}
            to="/login"
            className="text-danger"
            onClick={this.onUserLogout}
          >
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

export default withRouter(UserActions);
/*
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from 'shards-react';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../../api/api';
import Avatar from 'react-avatar';

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      userData: this.props.userData,
      token: this.props.token,
      profileImage: this.props.profileImage
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  onUserLogout = () => {
    logoutUser(this.state.token).then(() => this.props.history.push('/login'));
  };

  renderProfileImage = image => {
    if (image) {
      const imagePath = require(`../../../server/client/${image}`);
      return (
        <div
          onError={null}
          style={{ backgroundImage: `url(${imagePath})` }}
          className="profile-avatar-small"
        />
      );
    } else {
      return (
        <Avatar
          name={this.state.userData.firstName}
          round={true}
          size={40}
          className="rounded-circle mr-2"
        />
      );
    }
  };

  render() {
    console.log('rneot', this.state.profileImage);
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          {this.state.userData &&
            this.renderProfileImage(this.state.profileImage)}{' '}
          <span className="d-none d-md-inline-block">
            {this.state.userData && this.state.userData.firstName}
          </span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to={`${this.props.match.path}/profile`}>
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to={`${this.props.match.path}`}>
            <i className="material-icons">&#xE896;</i> My Notes
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            tag={Link}
            to="/login"
            className="text-danger"
            onClick={this.onUserLogout}
          >
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

export default withRouter(UserActions);
*/