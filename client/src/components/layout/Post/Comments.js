import React, { Component, Fragment } from 'react';
import '../../../css/app.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = {
    card: {
        marginBottom: 20
    }
};

class Comments extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, comments } = this.props;
        return (
            <div>
                {comments.map((comment) => {
                    const { createdAt, body, userHandle } = comment;
                    return(
                        <Fragment key={createdAt}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="subtitle1" color="primary">
                                        {userHandle}
                                    </Typography>
                                    <Typography variant="caption text" color="textSecondary">
                                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {body}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Fragment>
                    )
                })}     
            </div>       
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps)(withStyles(styles)(Comments));