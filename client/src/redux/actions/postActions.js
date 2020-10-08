import axios from 'axios';

export const createPost = (newPost) => {
    axios
        .post('/post', newPost)
        .then((res) => {
                
        })
        .catch((err) => {
            
        })
};
