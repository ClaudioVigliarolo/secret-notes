import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { createUser } from '../../api/api';
class Registration extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    secret: '',
    errors: []
  };

  displayErrors = errors => errors.map((error, i) => error.message);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSecretChange = event => {
    this.setState({ secret: event.target.value });
  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.form && error.form.includes(inputName))
      ? 'form-control is-invalid'
      : 'form-control';
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [] });
      this.saveUser(this.state);
    }
  };

  getEmptyFields = state => {
    let emptyFields = [];
    Object.keys(state).forEach(key => {
      if (state[key] === '') emptyFields.push(key);
    });

    return emptyFields.toString();
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = {
        message: 'Fill in all fields',
        form: this.getEmptyFields(this.state)
      };
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

  isFormEmpty = ({ firstName, lastName, password, email, secret }) => {
    return (
      !firstName.length ||
      !lastName.length ||
      !secret.length ||
      !email.length ||
      !password.length
    );
  };

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
    createUser({ firstName, lastName, email, password, secret })
      .then(() => {
        this.props.history.push(`/login`);
      })
      .catch(error => {
        let errors = [];
        error = { message: 'Server Error' };
        this.setState({ errors: errors.concat(error) });
      });
  };

  render() {
    const { firstName, lastName, email, password, secret, errors } = this.state;

    return (
      <div className="div-center form-responsive" style={{ marginBottom: 100 }}>
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
                          className={this.handleInputError(errors, 'firstName')}
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
                          className={this.handleInputError(errors, 'lastName')}
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
                          className={this.handleInputError(errors, 'email')}
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
                          className={this.handleInputError(errors, 'password')}
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
                        className={this.handleInputError(errors, 'secret')}
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
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Link to="/login" className="bottom-nav-text">
          {' '}
          <h6>
            {' '}
            Login <i className="arrow right bottom-nav-text-i"></i>{' '}
          </h6>
        </Link>
      </div>
    );
  }
}
export default withRouter(Registration);
