import React, { Component } from "react";

export default class NotesHeader extends Component {
  state = { isEditable: this.props.isEditable };

  render() {
    return (
      <div
        className="notes-header"
      >
        <input
          disabled={!this.state.isEditable}
          style={{ borderBottomColor: this.state.isEditable && 'black' }}
          className="text-input"
          value={this.props.notebookHeader}
          onChange={this.props.onChangeNoteBookName}
        />
      </div>
    );
  }
}
