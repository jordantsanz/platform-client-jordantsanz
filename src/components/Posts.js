import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/index';

function mapStateToProps(reduxState) {
  return {
    allPosts: reduxState.posts.all,
  };
}

// eslint-disable-next-line react/prefer-stateless-function
class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="postsPage">
        <h1 className="postsPageTitle">Welcome to the Posts Page! </h1>
        <h2 className="postsPageSubtitle">Here you can find all of the posts. Click on one to see more!</h2>
        <div className="postList">
          {this.props.allPosts.map((post) => {
            return (
              <Link to={`posts/${post.id}`} key={post.id}>
                <div className="post" id={post.id} key={post.id}>
                  <h1 className="title">{post.title}</h1>
                  <img className="coverURL" src={post.coverUrl} alt="cover" />
                  <div className="tags">{post.tags}</div>
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { fetchPosts })(Posts);
