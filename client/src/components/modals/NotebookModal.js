import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {
  FormInput,
} from "shards-react";


const MAX_NOTEPAD_NAME_LENGTH = 15;


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default class NotebookModal extends React.Component {
  state = { open: true, name: '', error: false, userData: this.props.userData, token: this.props.token }

  onCreate = () => {
    if (this.state.name.length > MAX_NOTEPAD_NAME_LENGTH || this.state.name.length < 1)
      this.setState({ error: true })
    else {
      this.setState({ error: false })
      this.props.onCreate(this.state.name, this.state.userData._id, this.state.token);
      this.props.handleClose();
    }
  }

  render() {

    return (
      <div>
        <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <div style={{ padding: 10 }}>
            <DialogTitle id="alert-dialog-slide-title">{"Create A new Secret Notebook"}</DialogTitle>
            <DialogContent>
              <FormInput placeholder="Notebook Name" value={this.state.name} invalid={this.state.error} onChange={(e) => this.setState({ name: e.target.value })} />
            </DialogContent>
            <DialogActions >
              <div className="div-center">
                <button type="button" className="mb-2 btn btn-md btn-primary mr-1 " onClick={this.onCreate}>Create</button>
              </div>
            </DialogActions>
          </div>
        </Dialog>

      </div>
    );
  }
}