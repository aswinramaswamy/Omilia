import React, { Component } from 'react';
import '../css/app.css';
import axios from 'axios';
import User from '../components/layout/UserDisplay';

//Components
import Navbar from '../components/layout/Navbar';
import SimpleTabs from '../components/search/SearchSimpleTabs';

class SearchResults extends Component {
  state = {
    searchResults: null
  }

  componentDidMount() {
    let search = this.props.match.params.search;
    console.log(search);
    axios
      .post('/searchUsers', search)
      .then(res => {
        this.setState({
          searchResults: res.data
        });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {
      return (
          <div>
              <Navbar/>
              <SimpleTabs searchResults={this.state.searchResults}></SimpleTabs>
          </div>
      );
  }
}

export default SearchResults;