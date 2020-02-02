import React from 'react'
import { withRouter } from 'react-router-dom';
const NotFound = (props) => {
  return (
    <div className="error">
      <div className="error__content">
        <h2>404</h2>
        <h3>This page is not available</h3>
        <p>Please go back to Login</p>
        <button type="button" className="btn btn-accent btn-pill" onClick={() => { props.history.push('/login') }}>← Go Back</button>
      </div>
    </div>
  )
}

export default withRouter(NotFound)