import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faPen, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { fetchPost, deletePost, updatePost } from '../actions/index';

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}

// eslint-disable-next-line react/prefer-stateless-function
class Post extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: false,
      title: '',
      tags: '',
      content: '',
      coverUrl: '',
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  delete = () => {
    this.props.deletePost(this.props.currentPost.id, this.props.history);
  }

  updateState = () => {
    this.setState({
      isUpdating: true,
      title: this.props.currentPost.title,
      content: this.props.currentPost.content,
      tags: this.props.currentPost.tags,
      coverUrl: this.props.currentPost.coverUrl,
    });

    console.log(this.state.title);
  }

  onInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  onInputCoverChange = (event) => {
    this.setState({
      coverUrl: event.target.value,
    });
  }

  onInputTagsChange = (event) => {
    this.setState({
      tags: event.target.value,
    });
  }

  onInputContentChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  }

  updateDone = () => {
    const post = {
      id: this.props.currentPost.id,
      title: this.state.title,
      content: this.state.content,
      coverUrl: this.state.coverUrl,
      tags: this.state.tags,
    };
    this.props.updatePost(post, this.props.history);
    this.props.fetchPost(this.props.currentPost.id);
    this.setState({
      isUpdating: false,
      title: '',
      content: '',
      coverUrl: '',
      tags: '',
    });
  }

  renderUpdating = () => {
    if (this.state.isUpdating) {
      return (
        <div className="postSingle">
          <div className="post-header">
            <div className="post-icons">
              <FontAwesomeIcon icon={faTrash} className="icon" id="delete" onClick={this.delete} />
              <FontAwesomeIcon icon={faCheck} className="icon" id="finished" onClick={this.updateDone} />
            </div>
          </div>
          <TextareaAutosize minRows={2} className="input" id="inputTitle" value={this.state.title} onChange={this.onInputChange} />
          <TextareaAutosize minRows={2} className="input" id="inputContent" value={this.state.content} onChange={this.onInputContentChange} />
          <TextareaAutosize minRows={2} className="input" id="inputCover" value={this.state.coverUrl} onChange={this.onInputCoverChange} />
          <TextareaAutosize minRows={2} className="input" id="inputTags" value={this.state.tags} onChange={this.onInputTagsChange} />
        </div>
      );
    } else {
      return (
        <div className="post-page">
          <div className="instructions">Great post! Click in the top-right to edit or delete it.</div>
          <div className="postSingle" id="post-specific">
            <div className="post-header">
              <div className="post-icons">
                <FontAwesomeIcon icon={faTrash} className="icon" id="delete" onClick={this.delete} />
                <FontAwesomeIcon icon={faPen} className="icon" id="update" onClick={this.updateState} />
              </div>
            </div>
            <h1 className="title">{this.props.currentPost.title}</h1>
            <div className="post-body">
              <div className="content">{this.props.currentPost.content}</div>
              <img className="coverURL" src={this.props.currentPost.coverUrl} alt="cover" />
              <div className="tags">Tags: {this.props.currentPost.tags}</div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="postHolder">{this.renderUpdating()}</div>
    );
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
