import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

class Registration extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    secret: '',
    errors: [],
    loading: ''
  };

  displayErrors = errors => errors.map((error, i) => error.message);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSecretChange = event => {
    this.setState({ secret: event.target.value });
  };

  handleInputError = (errors, inputName) => {
    if (errors.length > 0)
      return errors.some(
        error =>
          error.message && error.message.toLowerCase().includes(inputName)
      )
        ? { borderColor: 'red', borderStyle: 'solid', borderWidth: 1 }
        : {};
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [] });
      this.saveUser(this.state);
    } else {
      console.log(this.state.errors);
    }
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state) && this.isEmailValid(this.state.email)) {

      error = { message: 'Fill in all fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'The Password must be Stronger' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ firstName, lastName, email, password, secret }) => {
    return (
      !firstName.length ||
      !lastName.length ||
      !secret.length ||
      !password.length
    );
  };

  isEmailValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isPasswordValid({ password }) {
    const p = password;
    let anUpperCase = /[A-Z]/;
    let aLowerCase = /[a-z]/;
    let aNumber = /[0-9]/;
    let aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    let obj = {};
    obj.result = true;

    if (p.length < 8) {
      return false;
    }

    let numUpper = 0;
    let numLower = 0;
    let numNums = 0;
    let numSpecials = 0;
    for (let i = 0; i < p.length; i++) {
      if (anUpperCase.test(p[i])) numUpper++;
      else if (aLowerCase.test(p[i])) numLower++;
      else if (aNumber.test(p[i])) numNums++;
      else if (aSpecial.test(p[i])) numSpecials++;
    }

    if (numUpper < 1 || numLower < 1 || numNums < 1 || numSpecials < 1) {
      return false;
    }
    return true;
  }

  saveUser = ({ firstName, lastName, email, password, secret }) => {
    axios

      .post(`${process.env.REACT_APP_API_ENDPOINT}/users`), {
        firstName,
        lastName,
        email,
        password,
        secret
      }
        .then(() => {
          this.props.history.push(`/login`);
        })
        .catch(error => {
          let errors = [];
          error = { message: error };
          this.setState({ errors: errors.concat(error) });
        });
  };

  render() {
    const { firstName, lastName, email, password, secret, errors } = this.state;

    return (
      <div className="div-center form-responsive">
        <div className="card card-small mb-4">
          <div className="card-header border-bottom">
            <h4 className="text-center">Registration</h4>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item p-3">
              <div className="row">
                <div className="col">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="feFirstName">First Name</label>
                        <input
                          name="firstName"
                          type="text"
                          className="form-control"
                          style={this.handleInputError(errors, 'firstName')}
                          id="feFirstName"
                          placeholder="First Name"
                          value={firstName}
                          onChange={this.handleChange}
                        />{' '}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="feLastName">Last Name</label>
                        <input
                          name="lastName"
                          type="text"
                          style={this.handleInputError(errors, 'lastName')}
                          className="form-control"
                          id="feLastName"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={this.handleChange}
                        />{' '}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label
                          htmlFor="feEmailAddress"
                          onChange={this.handleChange}
                        >
                          Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          style={this.handleInputError(errors, 'email')}
                          className="form-control"
                          id="feEmailAddress"
                          placeholder="Email"
                          value={email}
                          onChange={this.handleChange}
                        />{' '}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="fePassword">Password</label>
                        <input
                          name="password"
                          type="password"
                          style={this.handleInputError(errors, 'password')}
                          className="form-control"
                          id="fePassword"
                          onChange={this.handleChange}
                          value={password}
                          placeholder="Password"
                        />{' '}
                      </div>
                    </div>
                    <div className="form-group col-md-12">
                      <h6
                        className="text-center"
                        onChange={this.handleChange}
                        value={secret}
                      >
                        Greatest Secret
                      </h6>
                      <textarea
                        name="secret"
                        className="form-control"
                        rows={5}
                        placeholder={'I love putin'}
                        onChange={this.handleSecretChange}
                        value={secret}
                      />
                    </div>
                    {errors.length > 0 && (
                      <h6 className="text-center" style={{ color: 'red' }}>
                        {this.displayErrors(errors)}
                      </h6>
                    )}
                    <div className="flex-center">
                      <button type="submit" className="btn btn-accent">
                        Sign up
                      </button>
                    </div>
                  </form>
                  <Link to="/login" className="bottom-nav-text">
                    {' '}
                    <h6>
                      {' '}
                      Login <i className="arrow right bottom-nav-text-i"></i>{' '}
                    </h6>
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
export default withRouter(Registration);
