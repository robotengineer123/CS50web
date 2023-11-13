import axios from "axios";

export const fetchUsers = async () => {
    try {

        const response = await axios.get("api/posts")
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchPosts = async () => {
    try {
        const response = await axios.get("api/posts")
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const likePost = async (user, post) => {
    const like = {poster: user, post: post};
    axios.post("api/likes", like);
}

export const fetchComments = async () => {
    try {
        const response = await axios.get("api/comments")
        for (let post of response.data) {
            let [date, timeOfDay] = post.stamp.split('T');
            let [hour, min, ,] = timeOfDay.split(':');
            post.stamp = date + " " + hour + ":" + min;
        }
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async (post) => {
    try {
        const response = await axios.get("api/post/"+post.id)
        for (let post of response.data) {
            let [date, timeOfDay] = post.stamp.split('T');
            let [hour, min, ,] = timeOfDay.split(':');
            post.stamp = date + " " + hour + ":" + min;
        }
        return response.data;
    } catch (error) {
        console.log(error)
    }

}