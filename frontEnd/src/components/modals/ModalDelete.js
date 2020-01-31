import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const NotebookModal = (props) => {

  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div style={{ padding: 10 }}>
          <DialogTitle id="alert-dialog-slide-title">
            {`Are You Sure To Delete This ${props.text}?`}
          </DialogTitle>
          <DialogActions>
            <div className="div-center">
              <button type="submit" className="btn btn-accent red-button" onClick={props.onConfirm}>Confirm</button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}

export default NotebookModal;