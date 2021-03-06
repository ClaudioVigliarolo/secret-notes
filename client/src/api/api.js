import axios from 'axios';
import FormData from 'form-data';
import { HOSTNAME } from '../config/config'

export const createUser = async (newUser) => {
  return axios
    .post(`${HOSTNAME}/users`, {
      newUser
    })
    .then((res) => {
      return res;
    })
    .catch(error => {
      return error;
    });
}

export const loginUser = async (email, password) => {
  return axios.post(`${HOSTNAME}/users/login`, {
    email,
    password,
  })
    .then((res) => {
      return res;

    })
    .catch((err) => {
      return err

    })
}



export const createNotebook = async (name, ownerId, userToken) => {
  return axios
    .post(
      HOSTNAME + '/noteBooks',
      {
        name,
        owner: ownerId
      },
      {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      }
    )
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const logoutUser = async userToken => {
  axios
    .get(HOSTNAME + '/users/me', {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getUserData = async userToken => {

  return axios
    .get(HOSTNAME + '/users/me', {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getUserAvatar = async userToken => {
  return axios
    .get(HOSTNAME + '/users/me/avatar', {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getNotebooks = async (userId, userToken) => {
  return axios
    .get(`${HOSTNAME}/noteBooks/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getNotes = async (notebookId, userToken) => {
  return axios
    .get(`${HOSTNAME}/noteBook/${notebookId}`, {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadNote = async (note, noteBookId, userToken) => {
  return axios
    .post(
      `${HOSTNAME}/noteBooks/${noteBookId}`,
      {
        note
      },
      {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      }
    )
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};


export const removeNote = async (noteBookId, noteId, userToken) => {
  return axios
    .delete(`${HOSTNAME}/noteBook/${noteBookId}/${noteId}`, {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateNotebook = async (newNotebook, userToken) => {
  return axios
    .patch(
      `${HOSTNAME}/noteBook/${newNotebook._id}`,
      {
        name: newNotebook.name
      },
      {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      }
    )
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteNotebook = async (id, userToken) => {
  return axios
    .delete(`${HOSTNAME}/noteBook/${id}`, {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateNote = async (noteBookId, noteId, note, userToken) => {
  return axios
    .patch(
      `${HOSTNAME}/noteBook/${noteBookId}/${noteId}`,
      {
        note
      },
      {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      }
    )
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateUser = async (newUserData, userToken) => {
  return axios
    .patch(
      `${HOSTNAME}/users/me`,
      {
        newUserData
      },
      {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      }
    )
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

//update foto
export const uploadAvatar = async (photo, userToken) => {
  const formData = new FormData();
  formData.append('avatar', photo, photo.filename);
  return axios
    .post(`${HOSTNAME}/users/me/avatar`, formData, {
      headers: {
        Authorization: 'Bearer ' + userToken,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
