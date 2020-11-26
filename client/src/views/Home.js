import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
import PropTypes from 'prop-types';

//Components
import Navbar from '../components/layout/Navbar';
import Post from '../components/layout/Post/Post';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

class Home extends Component {  
    componentDidMount() {
        this.props.getPosts();
      }
      render() {
        const { posts, loading } = this.props.data;
        let recentPostsMarkup = loading ? (
          <CircularProgress className="middle" size={200} thickness={2}/>
        ) : (
          posts.map((post) => <Post key={post.postID} post={post} />)
        );
        return (
            <div>
                <Navbar/>
                <h1><Link to="logout"><button>Log Out</button></Link></h1>
                <h2>TIMELINE</h2>
                <div className="center">
                    {recentPostsMarkup}
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
  });
  
  export default connect(
    mapStateToProps,
    { getPosts }
  )(Home);