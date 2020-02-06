import React from 'react';
import classNames from 'classnames';
import { Col } from 'shards-react';
import SidebarHeader from './components/SidebarHeader';
import SideNotebooks from './components/SideNotebooks';
import MenuIcon from '@material-ui/icons/Menu';

class MainSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: this.props.userData,
      token: this.props.token,
      notebooks: this.props.notebooks,
      isOpen: false
    };
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { userData, token, notebooks } = this.state;
    const classes = classNames(
      'main-sidebar',
      'px-0',
      'col-12',
      this.state.isOpen ? 'open' : ''
    );
    return (
      <div>
        <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
          <SidebarHeader toggleOpen={this.toggleOpen} />
          <SideNotebooks
            userData={userData}
            token={token}
            notebooks={notebooks}
            loadNotes={this.props.loadNotes}
            key={
              userData &&
              token &&
              notebooks[0] &&
              notebooks[0]._id &&
              this.props.currentNotebookIndex &&
              this.props.isEditable
            }
            currentNotebookIndex={this.props.currentNotebookIndex}
            onSubmit={this.onCreate}
            refreshNotebooks={this.props.refreshNotebooks}
            toggleEditNotebook={this.props.toggleEditNotebook}
            isEditable={this.props.isEditable}
          />
        </Col>
        <MenuIcon className="menu-icon" onClick={this.toggleOpen} />
      </div>
    );
  }
}

export default MainSidebar;
