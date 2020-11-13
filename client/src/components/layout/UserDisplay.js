import React, { Component } from 'react';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        marginBottom: 20
    }
};

class UserDisplay extends Component {
    render() {
        const { classes, user : username } = this.props
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography color="primary">
                        {username}
                     </Typography>
                </CardContent>
            </Card>
        )
    }
};

export default withStyles(styles)(UserDisplay);