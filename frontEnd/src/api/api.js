import axios from 'axios';
import FormData from 'form-data';

export const createNotebook = async (name, ownerId, userToken) => {
  return axios
    .post(
      process.env.REACT_APP_API_ENDPOINT + '/noteBooks',
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
    .get(process.env.REACT_APP_API_ENDPOINT + '/users/me', {
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
    .get(process.env.REACT_APP_API_ENDPOINT + '/users/me', {
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
    .get(process.env.REACT_APP_API_ENDPOINT + '/users/me/avatar', {
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
    .get(`${process.env.REACT_APP_API_ENDPOINT}/noteBooks/${userId}`, {
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
    .get(`${process.env.REACT_APP_API_ENDPOINT}/noteBook/${notebookId}`, {
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
      `${process.env.REACT_APP_API_ENDPOINT}/noteBooks/${noteBookId}`,
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
    .delete(`${process.env.REACT_APP_API_ENDPOINT}/noteBook/${noteBookId}/${noteId}`, {
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
      `${process.env.REACT_APP_API_ENDPOINT}/noteBook/${newNotebook._id}`,
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
      console.log('vdiiamo', res);
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteNotebook = async (id, userToken) => {
  return axios
    .delete(`${process.env.REACT_APP_API_ENDPOINT}/noteBook/${id}`, {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
    .then(res => {
      console.log('vdiiamo', res);
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

/* 

app.post('/upload', function(req, res) {
  console.log(req.files.foo); // the uploaded file object
});
*/
export const updateNote = async (noteBookId, noteId, note, userToken) => {
  return axios
    .patch(
      `${process.env.REACT_APP_API_ENDPOINT}/noteBook/${noteBookId}/${noteId}`,
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
      `${process.env.REACT_APP_API_ENDPOINT}/users/me`,
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
    .post(`${process.env.REACT_APP_API_ENDPOINT}/users/me/avatar`, formData, {
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

/*
const note = {
      description: " secondaaasono la descript",
      title: "secondaaasono this is the title",
      completed: true
    }


    axios.post("${process.env.REACT_APP_API_ENDPOINT}/noteBooks/5e2876dc63bae53d885c2812", {
      note
    }, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      },

    })
      .then((res) => {
        return res

      })
      .catch((err) => {
        console.log(err)
      })


      //get all taccuini names


////




axios.post("${process.env.REACT_APP_API_ENDPOINT}/note", {
      name: "secondNott",
      owner: userData._id,
    }, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      },

    })
      .then((res) => {
        return res

      })
      .catch((err) => {
        console.log(err)
      })


  }



   //get all notes of ITEM
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/noteBook/5e2876dc63bae53d885c2812`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      },

    })
      .then((res) => {
        return res

      })
      .catch((err) => {
        console.log(err)
      })


  }




  executeQuery = (userData) => {
    const { userToken } = this.props.location;
    //get all notes of ITEM
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/noteBook/5e2876dc63bae53d885c2812`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      },

    })
      .then((res) => {
        return res

      })
      .catch((err) => {
        console.log(err)
      })


  }
  */
