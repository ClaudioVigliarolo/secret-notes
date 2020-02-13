import React, { Component } from 'react';
import NotesHeader from './components/NotesHeader';
import NotesBody from './components/NotesBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import './notes.css';

export default function NotesMain({
  notes,
  firstNotebook,
  NotebookId,
  isEditable,
  loading,
  userData,
  token,
  notebookHeader,
  refreshNotes,
  onChangeNoteBookName
}) {

  return (
    <div className="notes-main">
      <NotesHeader
        notebookHeader={notebookHeader}
        isEditable={isEditable}
        onChangeNoteBookName={onChangeNoteBookName}
        key={userData && userData.lastName}
      />
      <NotesBody
        userData={userData}
        token={token}
        notes={notes}
        NotebookId={NotebookId}
        firstNotebook={firstNotebook}
        loading={loading}
        refreshNotes={refreshNotes}
        key={userData && userData.firstName}
      />
      <div className="loading-main-container">
        <CircularProgress
          className="loading-main"
          thickness={0.2}
          style={{ display: loading ? '' : 'none' }}
        />
      </div>
    </div>
  );
}
