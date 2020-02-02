import React from "react";
import { Nav } from "shards-react";
import Modal from '../../../modals/NotebookModal'
import DeleteModal from '../../../modals/ModalDelete'
import SidebarNotebookItem from "./SidebarNotebookItem";
import { createNotebook, deleteNotebook } from '../../../../api/api';
class SideNotebooks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: this.props.userData,
      token: this.props.token,
      notebooks: this.props.notebooks,
      newNotepadModal: false,
      deleteModal: false,
      currentNotebookIndex: this.props.currentNotebookIndex,
      isEditable: this.props.isEditable

    }
  }

  onDeleteNotebook = () => {
    deleteNotebook(this.state.notebooks[this.state.currentNotebookIndex]._id, this.state.token)
      .then(() => this.props.refreshNotebooks(this.state.userData, this.state.token));
  }


  renderNotebooks = (notebooks, currentNotebookIndex) => (

    notebooks && notebooks.map((item, idx) => (
      <SidebarNotebookItem key={idx} name={item.name}
        isEditable={this.props.isEditable}
        onClick={this.props.loadNotes} index={idx} selected={idx === currentNotebookIndex}
        onDeleteNotebook={this.openDeleteModal}
        toggleEditNotebook={this.props.toggleEditNotebook}
        default={true} />

    ))
  )

  openNewNotepadModal = () => {
    this.setState({ newNotepadModal: true, })
  }

  closeNewNotepadModal = () => {
    this.setState({ newNotepadModal: false })
  }


  openDeleteModal = () => {
    this.setState({ deleteModal: true, })
  }

  closeDeleteModal = () => {
    this.setState({ deleteModal: false })
  }

  onCreate = async (name, id, token) => {
    createNotebook(name, id, token).then(() => {
      this.props.refreshNotebooks(this.state.userData, token);
    })

  }




  render() {

    const { notebooks, newNotepadModal, userData, token, currentNotebookIndex, deleteModal } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column" >
          <div style={{ cursor: 'pointer' }}>
            <SidebarNotebookItem icon='<i class="material-icons">edit</i>' name="New Notebook" onClick={this.openNewNotepadModal} default={false} />
          </div>
          {this.renderNotebooks(notebooks, currentNotebookIndex)}
        </Nav>
        {newNotepadModal && <Modal handleClose={this.closeNewNotepadModal} userData={userData} token={token} onCreate={this.onCreate} />}
        {deleteModal && <DeleteModal handleClose={this.closeDeleteModal} token={token} onConfirm={this.onDeleteNotebook} text="Notebook" />}
      </div>
    )
  }
}

export default SideNotebooks;