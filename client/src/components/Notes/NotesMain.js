

import React, { Component } from 'react';
import NotesHeader from './components/NotesHeader'
import NotesBody from './components/NotesBody'
import CircularProgress from '@material-ui/core/CircularProgress';
import './notes.css'

export default class componentName extends Component {
  state = {
    token: this.props.token, userData: this.props.userData, NotebookId: this.props.NotebookId,
    isEditable: this.props.isEditable
  }

  render() {
    const { userData, token, NotebookId } = this.state;
    const { notes, firstNotebook } = this.props;
    console.log("immmm", notes, firstNotebook)
    return (
      <div className="notes-main">
        <NotesHeader notebookHeader={this.props.notebookHeader}
          isEditable={this.props.isEditable} onChangeNoteBookName={this.props.onChangeNoteBookName} key={this.props.isEditable} />
        <NotesBody userData={userData} token={token} notes={notes} NotebookId={NotebookId}
          firstNotebook={firstNotebook} key={this.props.notes} loading={this.props.loading}
        />
        <div className="loading-main-container">
          <CircularProgress className="loading-main" thickness={0.2} style={{ display: this.props.loading ? '' : 'none' }} />
        </div>
      </div>
    );
  }
}
