import React from 'react';
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
} from 'shards-react';
import { HOSTNAME } from '../../config/config'
import Avatar from 'react-avatar';
import { uploadAvatar } from '../../api/api';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

export default class UserAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.userData && this.props.userData.firstName,
      lastName: this.props.userData && this.props.userData.lastName,
      email: this.props.userData && this.props.userData.email,
      currentSecret: this.props.userData && this.props.userData.currentSecret,
      token: this.props.token,
      imageToUpload: null,
      error: false
    };
  }

  getFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ imageToUpload: file }, () => {
        this.uploadImage();
        this.setState({ loading: true });
      });
    }
  };

  handleChangeFile = () => {
    this.refs.fileUploader.click();
  };

  uploadImage = () => {
    uploadAvatar(this.state.imageToUpload, this.state.token)
      .then(res => {
        if (res.data) {
          this.setState({
            error: false
          }, () => this.props.changeAvatar(res.data));
        }
      })
      .catch(e => {
        this.setState({ error: true })
      });
  };

  renderProfileImage = profilePhoto => {
    if (profilePhoto) {

      return (
        <div className="flex-center">
          <div onError={null}
            style={{ backgroundImage: `url(${HOSTNAME}/${profilePhoto})` }}
            className="profile-avatar-main"
          />
        </div>
      );

    } else {

      return (
        <div className="flex-center">
          <Avatar
            name={this.state.firstName}
            round={true}
            size='10vw'
            className="rounded-circle mr-2"
          />
        </div>
      );

    }
  };
  render() {
    return (
      <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">

            {this.renderProfileImage(this.props.profileImage)}
            <input
              onChange={this.getFile}

              style={{ display: 'none' }}
              type="file"
              ref="fileUploader"
            />
          </div>
          <h4 className="mb-0">{this.state.firstName}</h4>
          <span className="text-muted d-block mb-2">{this.state.jobTitle}</span>
          <Button
            pill
            outline
            size="sm"
            className="mb-2"
            onClick={this.handleChangeFile}
            style={{ paddingLeft: 50, paddingRight: 50 }}
          >
            <AddAPhotoIcon className="material-icons mr-1">
              Change Image
            </AddAPhotoIcon>
          </Button>
        </CardHeader>
        {this.state.error && (
          <h8 style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
            We Encountered An Error
          </h8>
        )}
        <ListGroup flush>
          <ListGroupItem className="px-4">
            <div className="text-center" style={{ padding: 20 }}>
              <h6 className="mb-0 text-center">
                Personalize Your Profile with a better photo of Yourself{' '}
              </h6>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}
