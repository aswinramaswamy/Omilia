import React, { Component } from 'react';
import '../css/app.css';
import axios from 'axios';

//Components
import Navbar from '../components/layout/Navbar';
import User from '../components/layout/UserDisplay';

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
      let recentSearchResult = this.state.searchResults ? (
      this.state.searchResults.map((result) => <User user={result.username}/>)
      ) : (
          <p>Loading...</p>
      );

      return (
          <div>
              <Navbar/>
              <br></br>
              <div className="center">
                  {recentSearchResult}
              </div>
          </div>
      );
  }
}

export default SearchResults;