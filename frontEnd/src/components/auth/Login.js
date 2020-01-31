import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios'
class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: '',
  }

  displayErrors = errors =>
    errors.map((error, i) => error.message);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.includes(inputName))
      ? { borderColor: 'red', borderStyle: 'solid', borderWidth: 1 }
      : {};
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.loginUser(this.state);
  }


  loginUser = ({ email, password }) => {
    axios.post("http://localhost:5000/users/login", {
      email,
      password,
    })
      .then((res) => {
        this.props.history.push({
          pathname: '/secretNotes',
          userToken: res.data.token // pass test data as a props
        });

      })
      .catch(() => {
        let errors = [];
        const error = { message: "Unable To Login" };
        this.setState({ errors: errors.concat(error) });
      })
  }


  render() {

    const {
      email,
      password,
      errors
    } = this.state;

    return (
      <div className="div-center form-responsive-login" >
        <div className="card card-small mb-4">
          <div className="card-header border-bottom">
            <h4 className="text-center">Login</h4>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item p-3">
              <div className="row">
                <div className="col">
                  <form onSubmit={this.handleSubmit}>
                    <div className="flex-column-center">
                      <div className="form-group col-md-6  ">
                        <label htmlFor="feEmailAddress" onChange={this.handleChange}>Email</label>
                        <input name="email" type="email" style={this.handleInputError(errors, "email")} className="form-control" id="feEmailAddress" placeholder="Email" value={email} onChange={this.handleChange} /> </div>
                      <div className="form-group col-md-6" style={{ marginTop: 10 }} >
                        <label htmlFor="fePassword">Password</label>

                        <input name="password" type="password" style={this.handleInputError(errors, "password")} className="form-control" id="fePassword" onChange={this.handleChange} value={password} placeholder="Password" /> </div>
                    </div>
                    {<h6 className="text-center" style={{ color: 'red' }}>{this.displayErrors(errors)}</h6>}
                    <div className="flex-center">
                      <button type="submit" className="btn btn-accent" style={{ marginTop: 10 }}>Sign In</button>
                    </div>
                  </form>
                  <Link to="/register" className="bottom-nav-text "> <h6> Register <i className="arrow right bottom-nav-text-i"></i> </h6>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>

    );
  }
}

export default withRouter(Login);