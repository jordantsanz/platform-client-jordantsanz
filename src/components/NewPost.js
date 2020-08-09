/* eslint-disable eqeqeq */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { createPost } from '../actions/index';

function mapStateToProps(reduxState) {
  return {
    newPost: reduxState.posts.all,
  };
}

// eslint-disable-next-line react/prefer-stateless-function
class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      coverUrl: '',
      error: false,
      errors: 0,
    };
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

  validate = (post) => {
    // eslint-disable-next-line eqeqeq
    let fields = 0;
    if (post.title == '') {
      fields += 1;
    }
    if (post.content == '') {
      fields += 1;
    }
    if (post.coverUrl == '') {
      fields += 1;
    }
    if (post.tags == '') {
      fields += 1;
    }
    return fields;
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

  createOnClick = () => {
    const post = {
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags,
      coverUrl: this.state.coverUrl,
    };
    const fields = this.validate(post);
    if (fields == 0) {
      this.setState({
        error: false,
        errors: fields,
      });
      this.props.createPost(post, this.props.history);
    } else {
      this.setState({
        error: true,
        errors: fields,
      });
    }
  }

  titleEntered = () => {
    if (this.state.title != '') {
      return 'filled';
    } else {
      return 'unfilled';
    }
  }

  render() {
    let error,
      titleFilled,
      contentFilled,
      tagsFilled,
      coverUrlFilled;
    if (this.state.error) {
      error = <div className="error-message">Error: There are {this.state.errors} fields blank.</div>;
    }

    if (this.state.title != '') {
      titleFilled = 'filled';
    } else {
      titleFilled = 'unfilled';
    }

    if (this.state.content != '') {
      contentFilled = 'filled';
    } else {
      contentFilled = 'unfilled';
    }
    if (this.state.tags != '') {
      tagsFilled = 'filled';
    } else {
      tagsFilled = 'unfilled';
    }

    if (this.state.coverUrl != '') {
      coverUrlFilled = 'filled';
    } else {
      coverUrlFilled = 'unfilled';
    }

    return (
      <div className="newNotePage">
        <div className="NewNoteText">Enter in all of the fields to make a note!</div>
        <div className="input-flex">
          <h1 className="input-title-header" id={titleFilled}>Title: </h1>
          <input className="input" id="inputTitle" onChange={this.onInputChange} />
          <h1 className="input-title-header" id={contentFilled}>Content: </h1>
          <input className="input" id="inputText" onChange={this.onInputContentChange} />
          <h1 className="input-title-header" id={tagsFilled}>Tags: </h1>
          <input className="input" id="inputTags" onChange={this.onInputTagsChange} />
          <h1 className="input-title-header" id={coverUrlFilled}>Cover Photo URL: </h1>
          <input className="input" id="inputUrl" onChange={this.onInputCoverChange} />
          <Button type="button" className="submit" onClick={this.createOnClick}>Submit</Button>
          {error}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { createPost })(NewPost);
