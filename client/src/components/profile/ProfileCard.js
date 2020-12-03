import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from '@material-ui/core/Typography'

const styles = {
    card: {
        marginBottom: 20
    }
};

class ProfileCard extends Component {
  constructor() {
    super();
    this.state = {
        dialogOpen: false
    }
  } 
    render() {
        dayjs.extend(relativeTime)
        const {
          classes,
          follower : {
            userHandle,
            interactionCount
          }
        } = this.props

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" color="primary">
                        {userHandle}
                    </Typography>
                    <Typography variant="body1">
                        {interactionCount}
                    </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
        )
    }
}

ProfileCard.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(ProfileCard));