import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import PaletteIcon from '@material-ui/icons/Palette';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Checkbox from '@material-ui/core/Checkbox';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Draggable from 'react-draggable'; // Both at the same time
import ModalDelete from '../../modals/ModalDelete'
import './noteItem.css'


export default class NoteItem extends Component {
  state = {
    isPaletteShown: false, color: this.props.color, id: this.props.id, date: this.props.date, isOld: this.props.isOld, completed: this.props.completed, isSaved: false, isLoading: false, isEditing: false,
    title: this.props.title, description: this.props.description, modalDelete: false
  }

  togglePalette = () => {
    this.setState({ isPaletteShown: !this.state.isPaletteShown })
  }

  setColor = (color) => {
    this.togglePalette();
    this.setState({ color })
  }


  onTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  ondescriptionChange = (e) => {
    this.setState({ description: e.target.value })
  }

  showNewDate = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const newdate = day + "/" + month + "/" + year;

    return newdate;

  }



  formatDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
  }


  getDate = () => (this.state.isOld && this.state.date ? this.formatDate(this.state.date) : this.showNewDate())


  createNote = () => {
    const { title, description, color } = this.state;
    if (this.isAllowed(title)) {
      this.props.createNote({ title, description, color })
      this.setState({ title: '', description: '', color: '#fff' })
    }
  }


  onCardEdit = () => {
    this.setState({ isEditing: true });

  }
  onDoneEdit = () => {
    this.setState({ isEditing: false });
    const updatedCard = { title: this.state.title, description: this.state.description, color: this.state.color, completed: this.state.completed }
    this.props.onNoteUpdate(updatedCard, this.state.id);
  }


  openModalDelete = () => {
    this.setState({ modalDelete: true });
  }

  closeModalDelete = () => {
    this.setState({ modalDelete: false });
  }

  onConfirmDelete = () => {
    this.closeModalDelete();
    this.props.onNoteDelete(this.state.id);
  }

  onCheckChange = () => (this.setState({ completed: !this.state.completed }, () => this.onDoneEdit()))


  isAllowed = (title) => (title.length > 0);


  renderIcons = () => {
    if (this.state.isOld && !this.state.isEditing) {
      return (<div className="flex-center" style={{ marginTop: 10 }} >
        <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '20%' }} className="icon" onClick={this.onCardEdit} />
        <FontAwesomeIcon icon={faTrashAlt} className="icon" onClick={this.openModalDelete} />

      </div>)
    } else {
      return (
        <div className="flex-center" style={{ marginTop: 10 }} >
          <PaletteIcon className="icon" onClick={this.togglePalette} />
          <DoneOutlineIcon style={{ marginLeft: '15%' }} className="icon" onClick={() => { this.state.isEditing ? this.onDoneEdit() : this.createNote() }} />

        </div>
      )

    }
  }


  render() {
    const { isOld, isSaved, title, description, isEditing, modalDelete, completed } = this.state;
    return (
      <Draggable allowAnyClick={true} disabled={!isOld || isEditing}>
        <div className="note-item" style={{ backgroundColor: this.state.color, textDecoration: completed ? 'line-through' : '' }} >

          <div className="header"  >
            <input className="input-header" style={{ textDecoration: completed ? 'line-through' : '' }}
              placeholder="Type a Title..." onChange={this.onTitleChange} value={title} disabled={!isEditing && isOld}></input>
            <h6 style={{ opacity: 0.5 }}>{this.getDate()}</h6>
          </div>
          <Divider />
          <div className="note-description-container">
            <textarea className="textarea-styles" placeholder="Type Your Note..." onChange={this.ondescriptionChange} value={description} disabled={!isEditing && isOld} />

            {this.renderIcons()}

            {this.state.isPaletteShown && <div className="color-palette-container" >
              <div className="circle" style={{ backgroundColor: '#BCE0FF' }} onClick={() => this.setColor('#BCE0FF')} />
              <div className="circle" style={{ backgroundColor: '#a5feba' }} onClick={() => this.setColor('#a5feba')} />
              <div className="circle" style={{ backgroundColor: '#feeda5' }} onClick={() => this.setColor('#feeda5')} />
              <div className="circle" style={{ backgroundColor: '#ffb2b2' }} onClick={() => this.setColor('#ffb2b2')} />
              <div className="circle" style={{ backgroundColor: '#b0A4E6' }} onClick={() => this.setColor('#b0A4E6')} />
              <div className="circle" style={{ backgroundColor: '#fff' }} onClick={() => this.setColor('#fff')} />
            </div>
            }

          </div>
          {isOld && !isEditing && <Checkbox
            className="checkbox"
            value={completed}
            checked={completed}
            color="primary"
            style={{ color: completed ? '#007bff' : 'gray' }}
            onChange={this.onCheckChange}
          />}

          {isSaved && !isOld && <h6 className="text-bottom ">Not Saved</h6>}
          {this.state.isLoading && <CircularProgress className="loading" />}
          {modalDelete && <ModalDelete handleClose={this.closeModalDelete} onConfirm={this.onConfirmDelete} text="Note" />}

        </div>
      </Draggable>

    );
  }
}