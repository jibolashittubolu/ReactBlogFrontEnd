import './post.scss'
import love_cupcake from '../../assets/images/love_cupcake.jpg'
import {Link} from "react-router-dom";

function Post(props) {
    const PublicFolderURL = "http://localhost:5000/submittedimages/"
    const {propsingleFetchedPost} = props;

    return (
        <div className='post'>
            {
                propsingleFetchedPost.photo && (
                    <img 
                    className='postImage'
                    src={PublicFolderURL + propsingleFetchedPost.photo}
                    // src={propsingleFetchedPost.photo} 
                    alt=''
                    />
                )
            }
            <div className='postInfo'>
                <div className='postCategories'>
                    {propsingleFetchedPost.categories.length > 0 ?
                        propsingleFetchedPost.categories.map(
                            (singleFetchedCategory) => (
                                <span className='postCategory'>{singleFetchedCategory}</span>
                            )
                        ):
                            null
                     }
                </div>
                {/* this is ithe id of the single post derived from the  */}
                <Link to = {`/post/${propsingleFetchedPost._id}`}className="link">
                    <span className='postTitle'>
                        {propsingleFetchedPost.title}
                    </span>
                </Link>
                <hr/>
                <span className='postDate'>{new Date(propsingleFetchedPost.createdAt).toDateString()}</span>
            </div>
            <p className='postDescription'>
                {
                    propsingleFetchedPost.description +
                    'AFDaf Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt minus accusamus magni quaerat cumque blanditiis, maiores vero sed nihil'+
                    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt minus accusamus magni quaerat cumque blanditiis, maiores vero sed nihil' +
                    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt minus accusamus magni quaerat cumque blanditiis, maiores vero sed nihil' +
                    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt minus accusamus magni quaerat cumque blanditiis, maiores vero sed nihil'
                }
            </p>
        </div>
    )
}

export default Post
