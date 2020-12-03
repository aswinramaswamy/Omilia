import React, { Component } from 'react';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Link from 'react-router-dom/Link';

const styles = {
    card: {
        marginBottom: 20
    }
};

class UserDisplay extends Component {
    render() {
        const { classes, user : username } = this.props
        var profilePath = `/profile/${username}`;
        return (
            <Card className={classes.card}>
                <CardContent>
                <Typography variant="h6" color="primary" component={Link} to={`/users/${username}`}>
                        {username}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
};

export default withStyles(styles)(UserDisplay);