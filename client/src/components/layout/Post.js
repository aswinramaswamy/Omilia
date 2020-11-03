import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

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

class Post extends Component {
    render() {
        const { classes, post : { createdAt, body, userHandle } } = this.props
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" color="primary">
                         {userHandle}
                     </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {createdAt}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="like">
                        <ArrowUpwardIcon color="primary"/>
                    </IconButton>
                    <IconButton aria-label="dislike">
                        <ArrowDownwardIcon color="tertiary"/>
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(Post);