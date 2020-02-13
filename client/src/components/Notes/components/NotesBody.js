import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import '../notes.css'
import NoteItem from './NoteItem'
import { uploadNote, removeNote, updateNote } from '../../../api/api'
export default class NotesBody extends Component {
  state = { token: this.props.token, userData: this.props.userData, }

  uploadNote = async (note) => {
    const res = await uploadNote(note, this.props.NotebookId, this.state.token);
    this.props.refreshNotes(res.data.notes);
  }

  onNoteDelete = async (noteId) => {
    removeNote(this.props.NotebookId, noteId, this.state.token).then((res) => this.props.refreshNotes(res.data.notes))

  }

  onNoteUpdate = async (updatedNote, noteId) => {
    const res = await updateNote(this.props.NotebookId, noteId, updatedNote, this.state.token);
    this.props.refreshNotes(res.data.notes);
  }

  showStartMessage = () => {
    return (
      <div className="welcome-message-container">
        <div className="error__content">
          <h2 style={{ fontSize: 50 }}>Welcome</h2>
          <h3 style={{ fontSize: 30 }}>Create a new Notebook to Start using the App</h3>
        </div>
      </div>
    )
  }

  renderNotes = (firstNotebook, notes, loading) => {
    if (!firstNotebook && !loading) return this.showStartMessage()
    return notes && notes.length > 0 && notes.map(item => (
      <NoteItem key={item._id} title={item.note.title} description={item.note.description} completed={item.note.completed}
        color={item.note.color} isOld={true} id={item._id} onNoteDelete={this.onNoteDelete} onNoteUpdate={this.onNoteUpdate} />
    ))
  }

  render() {
    const { loading, firstNotebook, notes } = this.props;

    return (
      <FadeIn>
        <div className="notes-body" >
          {firstNotebook && <NoteItem createNote={this.uploadNote} color="#fff" description='' title='' isOld={false} />}
          {this.renderNotes(firstNotebook, notes, loading)}
        </div>
      </FadeIn>
    );
  }
}
