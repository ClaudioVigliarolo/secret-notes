
import React, { Component } from 'react';
import { Container, Row, Col } from "shards-react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Notes from '../Notes/NotesMain'
import SideBar from '../layout/SideBar/Sidebar'
import Profile from '../Profile/Profile'
import TopBar from '../layout/TopBar/TopBar';
import { getNotebooks, getNotes, getUserData, updateNotebook, getUserAvatar } from '../../api/api'

class Main extends Component {
  _isMounted = false;
  state = {
    loading: true, userData: null, profileImage: null, error: false, token: null, notebooks: [],
    currentNotes: [], currentNotebook: {}, currentNotebookIndex: 0, showedNotes: [],
    isEditable: false, searchTerm: ""
  }

  componentDidMount() {
    this._isMounted = true;
    const { userToken } = this.props.location;
    if (!userToken) {
      this.props.history.push(`/login`);
    }
    getUserData(userToken)
      .then((response) => {
        if (this._isMounted) {
          this.getAvatar(userToken);
          this.loadNotebooks(response.data, userToken)
          this.setState({ token: userToken })
          this.setState({ userData: response.data })
          this.setState({ loading: false });
        }
      }).catch(err => {
        this.setState({ error: true })
        this.setState({ loading: false });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getAvatar = async token => {
    const profileImage = await getUserAvatar(token);
    if (profileImage) {
      this.setState({ profileImage: profileImage.data })
    }

  }



  loadNotebooks = async (userData, userToken) => {
    const notebooksData = await getNotebooks(userData._id, userToken);
    const notebooks = notebooksData.data;
    this.setState({ notebooks: [...notebooks] }, () => notebooks.length > 0 && this.loadNotes(0))

  }



  createDefaultNotebook = () => {
    this.setState({ startTip: true })
  }

  loadNotes = async (notebookIndex) => {
    const notebook = this.state.notebooks[notebookIndex];
    //for refreshing first note in child components
    this.setState({ currentNotebookIndex: -1 })
    const notesData = await getNotes(notebook._id, this.state.token);

    this.setState({
      currentNotes: this.sortNotes(notesData.data),
      showedNotes: this.sortNotes(notesData.data), currentNotebook: notebook,
      currentNotebookIndex: notebookIndex, isEditable: false, loading: false
    })
  }

  sortNotes = (notesData) => {
    return notesData.notes;
  }

  toggleEditNotebook = () => {
    this.state.isEditable ? this.saveEditNotebook() : this.setState({ isEditable: !this.state.isEditable })
  }

  saveEditNotebook = () => {
    this.setState({ isEditable: false });
    updateNotebook(this.state.currentNotebook, this.state.token);
  }

  onChangeNotebookName = e => {
    const currentNotebook = this.state.currentNotebook;
    currentNotebook.name = e.target.value;
    this.setState({ currentNotebook })
  }
  handleSearchNotes = (e) => (
    this.setState({ searchTerm: e.target.value, searchLoading: true }, () => this.handleSearchTerm(this.state.searchTerm))
  )

  handleSearchTerm = (searchTerm) => {
    const newNotesArray = [...this.state.currentNotes];
    const regex = new RegExp(searchTerm, 'gi');
    const showedNotes = newNotesArray.reduce((acc, item) => {
      if (item.note.title.match(regex) || item.note.description.match(regex)) {
        acc.push(item);
      }
      return acc;
    }, []);

    this.setState({ showedNotes });
  }

  updateUser = (newUserData) => { this.setState({ userData: null }, () => this.setState({ userData: newUserData })) }

  changeAvatar = (newAvatar) => { this.setState({ profileImage: null }, () => this.setState({ profileImage: newAvatar })) }

  render() {
    const { match } = this.props;
    const { userData, token, notebooks, currentNotebook, loading, currentNotebookIndex, showedNotes, isEditable, profileImage, searchTerm } = this.state;
    return (
      <div>
        <Container fluid >
          <Row>
            <SideBar userData={userData} token={token} key={token && userData && notebooks[0] && notebooks[0]._id && currentNotebookIndex}
              notebooks={notebooks} loadNotes={this.loadNotes} currentNotebookIndex={currentNotebookIndex} refreshNotebooks={this.loadNotebooks}
              toggleEditNotebook={this.toggleEditNotebook} isEditable={isEditable}
            />
            <Col
              className="main-content p-0"

              lg={{ size: 10, offset: 2 }}
              md={{ size: 9, offset: 3 }}
              sm="12"
              tag="main"

            >
              <TopBar userData={userData} token={token} handleSearchChange={this.handleSearchNotes} searchValue={searchTerm}
                profileImage={profileImage} key={userData && userData.firstName} />
              <Switch>
                <Route exact path={match.path} render={() => (
                  <Notes userData={userData && userData} loading={loading} firstNotebook={notebooks && notebooks.length > 0}
                    token={token} notes={showedNotes} NotebookId={currentNotebook._id}
                    notebookHeader={currentNotebook.name} isEditable={isEditable} onChangeNoteBookName={this.onChangeNotebookName}
                    key={currentNotebookIndex} />)} />

                <Route exact path={`${match.path}/profile`} render={() => (<Profile component={Profile}
                  updateChanges={this.updateUser}
                  profileImage={profileImage} userData={userData} token={token}
                  key={userData && userData._id} changeAvatar={this.changeAvatar} />)} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

}


export default withRouter(Main)

