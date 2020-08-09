import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import NavBar from './NavBar';
import NewPost from './NewPost';
import Post from './Post';
import Posts from './Posts';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route path="/posts/new" component={NewPost} />
        <Route path="/posts/:postID" component={Post} />
        <Route render={() => (<div>post not found</div>)} />
      </Switch>
    </Router>
  );
};

export default App;
