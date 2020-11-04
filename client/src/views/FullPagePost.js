import React from 'react';
import Logo from '../components/layout/Logo'
import '../css/app.css';

export default class FullPagePost extends React.Component {  
    render() {
        return (
            <div class='fullpagepost'>
                <p class="left">
                    <Logo />
                </p>
                <p class='middle'>
                    <h1>Screen Name</h1>
                    <br></br>
                    <h1>This will be the post contents. Where people can share thier thoughts and imagesand videos and links. Text can be up to five hundred characters.</h1>
                    <br></br>
                    <h1>here will be reactions and likes and dislikes</h1>
                    <h1>Created At:</h1>
                    <h1>Edited, Edited At:</h1>
                </p>
            </div>
        )
    }
}