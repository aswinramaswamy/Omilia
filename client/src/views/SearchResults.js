import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import "../css/app.css";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";

//MUI Stuff
//import TextField from "@material-ui/core/TextField";
//import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
//import Typography from "@material-ui/core/Typography";
//import CircularProgress from "@material-ui/core/CircularProgress";

//Redux Stuff
import { connect } from "react-redux";
import { getSearchData } from "../redux/actions/userActions";

//Components
import Navbar from '../components/layout/Navbar';

const styles = (theme) => ({
  ...theme.spreadIt,
});

class SearchResults extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  render() {
    const { classes } = this.props;
    //const { errors, loading } = this.state;

    return (
      <div className="start">
        <Navbar />
        <Grid container className={classes.form} direction="column">
          <Grid item sm />
          <Grid item sm>
            <div className="middle">
              
            </div>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: null,
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  getSearchData,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SearchResults));
