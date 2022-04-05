// import React from 'react'
import Post from '../post/Post'
import './posts.scss'

function Posts(props) {
    const {propFetchedPosts} = props
    return (
        <div className="posts">
            {
                propFetchedPosts.map(
                    (singleFetchedPost, key) => (
                        <Post key={key} propsingleFetchedPost={singleFetchedPost} />
                    )
                )
            }
        </div>
    )
}

export default Posts
