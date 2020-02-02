import React from 'react';
import { Link } from 'react-router-dom';
import { HOSTNAME } from '../../../../config/config'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
  CardLink
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
      token: this.props.token
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
          src={`${HOSTNAME}/${image}`}
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

  navTo = (dest) => (this.props.history.push(`${this.props.match.path}/${dest}`))

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions} >
        <div className="profile-top">
          {this.state.userData &&
            this.renderProfileImage(this.props.profileImage)}{' '}
          <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
            <span className="d-none d-md-inline-block">
              {this.state.userData && this.state.userData.firstName}
            </span>
          </DropdownToggle>
        </div>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem onClick={() => this.navTo('profile')}>
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem onClick={() => this.navTo('')} >
            <i className="material-icons">&#xE896;</i> My Notes
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            to="/login"
            className="text-danger"
            onClick={() => { this.onUserLogout(); this.navTo('login') }}
          >
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

export default withRouter(UserActions);
