import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import '../notes.css'
import NoteItem from './NoteItem'
import { uploadNote, removeNote, updateNote } from '../../../api/api'
export default class NotesBody extends Component {
  state = { token: this.props.token, userData: this.props.userData, notes: this.props.notes, NotebookId: this.props.NotebookId }


  uploadNote = async (note) => {
    const res = await uploadNote(note, this.state.NotebookId, this.state.token);
    this.refreshNotes(res.data.notes);
  }

  onNoteDelete = async (noteId) => {
    removeNote(this.state.NotebookId, noteId, this.state.token).then((res) => this.refreshNotes(res.data.notes))

  }

  onNoteUpdate = async (updatedNote, noteId) => {
    const res = await updateNote(this.state.NotebookId, noteId, updatedNote, this.state.token);
    this.refreshNotes(res.data.notes);
  }
  //this.props.onNoteUpdate(this.state.id, this.state.title, this.state.description);

  showStartMessage = () => {
    return (
      <div className="welcome-message-container">
        <div className="error__content">
          <h2 style={{ fontSize: 50 }}>Welcome</h2>
          <h3 style={{ fontSize: 30 }}>Create a new Notebook to Start using the App</h3>
        </div>
        {/* / .error_content */}
      </div>
    )
  }

  renderNotes = (notes) => {
    console.log(this.props.firstNotebook)
    if (!this.props.firstNotebook) return this.showStartMessage()
    return notes.length > 0 && notes.map(item => (
      <NoteItem key={item._id} title={item.note.title} description={item.note.description} completed={item.note.completed}
        color={item.note.color} isOld={true} id={item._id} onNoteDelete={this.onNoteDelete} onNoteUpdate={this.onNoteUpdate} />
    ))
  }



  refreshNotes = (newNotes) => (this.setState(this.setState({ notes: [] }, () => this.setState({ notes: newNotes }))))

  render() {
    const { notes } = this.state;
    const { loading, firstNotebook } = this.props;

    return (
      <FadeIn>
        {!loading && <div className="notes-body" >
          {firstNotebook && <NoteItem createNote={this.uploadNote} color="#fff" description='' title='' isOld={false} />}
          {this.renderNotes(notes)}
        </div>}
      </FadeIn>
    );
  }
}
