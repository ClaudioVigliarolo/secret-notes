

import React, { Component } from 'react';
import NotesHeader from './components/NotesHeader'
import NotesBody from './components/NotesBody'
import CircularProgress from '@material-ui/core/CircularProgress';
import './notes.css'

export default class componentName extends Component {
  state = {
    loading: true, token: this.props.token, userData: this.props.userData,
    notes: this.props.notes, NotebookId: this.props.NotebookId,
    isEditable: this.props.isEditable
  }

  render() {
    const { userData, token, NotebookId } = this.state;
    return (
      <div className="notes-main">
        <NotesHeader notebookHeader={this.props.notebookHeader}
          isEditable={this.props.isEditable} onChangeNoteBookName={this.props.onChangeNoteBookName} key={this.props.isEditable} />
        <NotesBody userData={userData} token={token} notes={this.props.notes} NotebookId={NotebookId} key={NotebookId && this.props.notes}
        />
        <div className="loading-main-container">
          <CircularProgress className="loading-main" thickness={0.2} style={{ display: this.props.loading ? '' : 'none' }} />
        </div>
      </div>
    );
  }
}
