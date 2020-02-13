import React from 'react'



export default function NotesHeader(props) {
  return (
    <div
      className="notes-header"
    >
      <input
        disabled={!props.isEditable}
        style={{ borderBottomColor: props.isEditable && 'black' }}
        className="text-input"
        value={props.notebookHeader}
        onChange={props.onChangeNoteBookName}
      />
    </div>
  )
}
