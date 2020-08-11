import axios from 'axios';

const ROOT_URL = 'https://jordantsanz-lab5.herokuapp.com/api';
// const API_KEY = '?key=jsanz';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  ERROR_SET: 'ERROR_SET',
  ERROR_DELETE: 'ERROR_DELETE',
  ERROR_FETCH: 'ERROR_FETCH',
};

// fetch posts action
export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_FETCH, error });
      });
  };
}

// create posts action
export function createPost(post, history) {
  return (dispatch) => {
    const fields = {
      title: post.title,
      content: post.content,
      coverUrl: post.coverUrl,
      tags: post.tags,
    };
    axios.post(`${ROOT_URL}/posts`, fields)

      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
        history.push(`/posts/${response.data.id}`);
      })

      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// update posts action
export function updatePost(post, history, switchUpdate) {
  return (dispatch) => {
    const fields = {
      title: post.title,
      content: post.content,
      coverUrl: post.coverUrl,
      tags: post.tags,
    };
    axios.put(`${ROOT_URL}/posts/${post.id}`, fields)

      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data.result });
        switchUpdate();
      })

      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// fetch post action
export function fetchPost(id) {
  return (dispatch) => {
    // API get call
    axios.get(`${ROOT_URL}/posts/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })

    // error catching
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_FETCH, error });
      });
  };
}

// delete action
export function deletePost(id, history) {
  return (dispatch) => {
    // API delete call
    axios.delete(`${ROOT_URL}/posts/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_DELETE, error });
      });
  };
}
