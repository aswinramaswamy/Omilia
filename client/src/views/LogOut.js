import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Logo from "../components/Logo";
import "../css/app.css";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

//MUI Stuff
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
//import IconButton from '@material-ui/core/IconButton'
//import { logoutUser } from '../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.spreadIt,
});

class LogOut extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLogOut = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/logout", userData)
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("FBIdToken", `Bearer ${res.data.token}`);
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
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
                Account Log Out
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
                  fullwidth
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
                  fullwidth
                />
                <br />
                {errors.general && (
                  <Typography variant="h2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}
                <Link to="/">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.Button}
                    disable={loading}
                  >
                    Log Out
                    {loading && (
                      <CircularProgress
                        size={20}
                        className={classes.progress}
                      />
                    )}
                  </Button>
                </Link>
                <br />
                <small>
                  Don't want to log out? Cancel <Link to="/home">here</Link>.
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

LogOut.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogOut);
