import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Logo from "../components/Logo";
import "../css/app.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//MUI Stuff
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux Stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadIt,
});

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

    return (
      <div className="start">
        <Grid container className={classes.form} direction="column">
          <Grid item sm />
          <Grid item sm>
            <div className="middle">
              <Logo />
              <Typography variant="h2" className={classes.pageTitle}>
                Account Log In
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  className={classes.textField}
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  value={this.state.email}
                  onChange={this.handleChange}
                  fullwidth="true"
                />
                <br />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  className={classes.textField}
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  value={this.state.password}
                  onChange={this.handleChange}
                  fullwidth="true"
                />
                <br />
                {errors.general && (
                  <Typography variant="h2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.Button}
                  disable={loading}
                >
                  Log in
                  {loading && (
                    <CircularProgress size={20} className={classes.progress} />
                  )}
                </Button>
                <br />
                <small>
                  Don't have an account? Sign up <Link to="/create">here</Link>.
                </small>
              </form>
            </div>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
