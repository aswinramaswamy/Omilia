import React, { Component } from 'react';

//MUI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'

class Post extends Component {
    render() {
        const { classes, post : { body, userHandle, createdAt } } = this.props
        return (
            <Card>
                <CardContent>
                    <Typography variant = "h6">{userHandle}</Typography>
                    <Typography variant = "body2">{createdAt}</Typography>
                    <Typography variant = "body1">{body}</Typography>
                    </CardContent>
            </Card>
        )
    }
}

export default Post