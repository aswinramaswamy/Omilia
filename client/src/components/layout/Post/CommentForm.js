import React, { Component } from 'react';
import PropTypes from 'prop-types';

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux';
import { createComment } from '../../../redux/actions/dataActions';
import { Typography } from '@material-ui/core';

const styles = (theme) =>({
    ...theme.spreadIt,
    invisibleSeperator: {
        border: 'none',
        margin: 10
    }
});

class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors});
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: '',
                errors: {}
            });
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createComment(this.props.postID, { body: this.state.body});
    };

    render() {
        const { classes } = this.props;
        const errors = this.state.errors;

        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    name="body"
                    type="text"
                    label="Comment on Post"
                    error={errors.error ? true : false}
                    helperText={errors.comment ? errors.comment : errors.error}
                    value={this.state.body}
                    onChange={this.handleChange}
                    fullWidth
                    className={classes.textField}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.Button}
                >
                    Post
                </Button>
            </form>
        )
    }
}

CommentForm.propTypes = {
    createComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

export default connect(mapStateToProps, { createComment })(withStyles(styles)(CommentForm));