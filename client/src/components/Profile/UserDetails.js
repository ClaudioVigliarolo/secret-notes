import React from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormTextarea,
  Button
} from "shards-react";
import { updateUser } from '../../api/api'

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.userData && this.props.userData.firstName,
      lastName: this.props.userData && this.props.userData.lastName,
      email: this.props.userData && this.props.userData.email,
      secret: this.props.userData && this.props.userData.secret,
      token: this.props.token
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSaveChanges = () => {
    if (this.areChangesAllowed(this.state)) {
      const newUserData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName, email: this.state.email, secret: this.state.secret
      }
      this.updateChanges(newUserData);

    }
  }


  updateChanges = (newUserData) => {
    updateUser(newUserData, this.state.token).then((updatedUser) => {
      this.props.updateChanges(updatedUser.data);
    })

  }





  areChangesAllowed = ({ firstName, lastName, email }) => (firstName.length > 0 && lastName.length > 0 && email.length > 0);


  render() {
    const { firstName, lastName, secret, email } = this.state;
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Your Profile</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    {/* First Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feFirstName">First Name</label>
                      <FormInput
                        id="feFirstName"
                        name="firstName"
                        placeholder="First Name"
                        value={firstName || ""}
                        onChange={this.handleChange}
                      />
                    </Col>
                    {/* Last Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feLastName">Last Name</label>
                      <FormInput
                        name="lastName"
                        id="feLastName"
                        placeholder="Last Name"
                        value={lastName || ""}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Email */}
                    <Col className="form-group">
                      <label htmlFor="feEmail">Email</label>
                      <FormInput
                        name="email"
                        type="email"
                        id="feEmail"
                        placeholder="Email Address"
                        value={email || ""}
                        onChange={this.handleChange}
                        autoComplete="email"
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="feDescription">Current Secret</label>
                      <FormTextarea
                        name="secret"
                        id="feDescription"
                        rows="5"
                        onChange={this.handleChange}
                        value={secret || ""}
                      />
                    </Col>
                  </Row>
                  <div className="flex-center">
                    <Button theme="primary" className="mb-2 mr-1" onClick={this.onSaveChanges}>
                      Save Changes
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}


