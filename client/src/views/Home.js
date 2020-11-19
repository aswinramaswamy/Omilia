import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
import PropTypes from 'prop-types';

//Components
import Navbar from '../components/layout/Navbar';
import HomeTabs from '../components/layout/HomeTabs';
import Post from '../components/layout/Post';

import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

class Home extends Component {  
    componentDidMount() {
        this.props.getPosts();
      }
      render() {
        const { posts, loading } = this.props.data;
        let recentPostsMarkup = !loading ? (
          posts.map((post) => <Post key={post.postID} post={post} />)
        ) : (
            <p>Loading...</p>
        );
        return (
            <div>
              <Navbar />
              <HomeTabs allPosts={posts}></HomeTabs>
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
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(
    mapStateToProps,
    { getPosts }
  )(Home);