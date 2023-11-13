import Post from './post';

export default function PostFeed({posts}) {
    let liPosts = posts.map( post => {
        return (<Post key={post.id} postJson={post} />);
    })
    return ( 
        <div className='row'>
            <div className="col-3">
                {liPosts}
            </div>
        </div>);
}