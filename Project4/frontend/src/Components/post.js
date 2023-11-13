import { useContext } from "react";
import { likePost } from "../Services/httpService";
import UserContext from "../user-context";

export default function Post({ postJson }) {
    const user = useContext(UserContext);
    return (
        <div className="card" style={{ boxShadow: "5px 5px grey", margin: "10px" }}>
            <div className="card-body text-start">
                <h3 className="card-title">{postJson.poster.username}</h3>
                <p className="card-text">{postJson.content}</p>
                <hr></hr>
                <p className="card-text"><small className="text-muted">Posted: {postJson.stamp}</small></p>
                <p className="card-text"><small className="text-muted">Likes: {postJson.likes.length}</small></p>
                <button className="btn btn-link" onClick={()=>likePost(user, postJson)}>Like</button>
                <button className="btn btn-link">Comment</button>
            </div>
        </div>);
}