import './singlepost.scss'
import single_post_image from '../../assets/images/single_post_image.jpg'

import React, { useEffect, useState, useContext } from 'react';
import { DeleteOutline, EditOutlined, Save, SaveAltOutlined} from '@material-ui/icons';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { aContext } from '../../context/Context';
import TopBar from '../topbar/TopBar';
import Sidebar from '../sidebar/Sidebar';


function SinglePost() {
    const {user} = useContext(aContext)
    const PublicFolderURL = "http://localhost:5000/submittedimages/"
    const navigate = useNavigate()
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    //location.pathname corresponds to the url behind the base url. It includes the preceding forward slash also
    const [post, setPost] = useState({})


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    //we set the initial title to the post.title. 
    //why? to allow us have the current title before we edit

    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const fetchPostById = async () => {
            const response = await axios.get('/posts/post/' + path ) 
            await setPost(response.data)
            setTitle(response.data.title)
            setDescription(response.data.description)
        }
        return fetchPostById()
    }, [path,updateMode])
    //the 2 dependencies are path and updateMode 
    //when the ending path of the url

    const handleDelete = async () => {
        try{
            await axios.delete("/posts/delete/" + path, {
                data: {username: user.username}
                }
            )
            //the reason for passing the username object is because at the backend route, we have specified that a req.body.username must be provided
            //also, because we are using the delete method the values must be enclosed in a data:{} object
            navigate('/') 
        }
        catch(error){
            
        }
    }

    const handleEdit = async () => {

    }

    const updateAndSave = async () => {
        try{
            console.log(path)
            await axios.put('/posts/post/update/' + path, {
                // data:{
                    username: user.username,
                    //the username above, is the username in the userIsLoggedIn context API
                    title: title,
                    //the title here is the title we have set in our input component
                    description: description
                    //the description in the value property is the description in the textarea input
                // }
            })
            await setUpdateMode(false)
            // setTitle(post.title)
            // setDescription(post.description)

        }
        catch(error){
        }

    }

    const saveEdit_button = (
        <button 
        onClick={() => updateAndSave()}
        style={{cursor:"pointer"}}
        className='saveAndUpdateButton' >
            Save
            <Save />
        </button>
    )

    return (
        <div className='singlePost'>
            <div className='singlePostWrapper'>
                {
                    post.photo && (
                        <img 
                        src={PublicFolderURL + post.photo} 
                        //post.photo is
                        className='singlePostImage' 
                        alt='' />
                    )
                }
                {
                    updateMode 
                    ?
                    <>
                        <input 
                        type='text' 
                        value={title}
                        onChange={(event) => setTitle(event.target.value)
                        }
                        className="singlePostTitleInput" 
                        autoFocus = {true} /> 
                    </>
                    :
                    (
                        <h1 className='singlePostTitle'>
                        {post.title}
                        { 
                            post.username === user?.username &&
                            <div className='singlePostEdit'>
                            <EditOutlined className='singlePostEditIcon' id='editIcon'
                            onClick = {() => setUpdateMode(true)}
                            />
                            <DeleteOutline className='singlePostEditIcon' id='deleteIcon'
                            onClick={() => handleDelete()} />
                            </div>
                        }
                        </h1>
                    )
                }

                <div className='singlePostInfo'>
                    <span className='singlePostAuthor'>
                        Author:
                        <Link 
                        to={`/?user=${post.username}`} 
                        className="link">  
                            <b> { post.username } </b>  
                        </Link>
                    </span>
                    <span 
                    className='singlePostDate'>
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                {
                    updateMode 
                    ?
                    (
                        <>
                        <textarea 
                        className='singlePostDescriptionInput'
                        value={description}
                        onChange={(event) => setDescription(event.target.value) }
                        >
                            {post.description}
                        </textarea>

                        {saveEdit_button}

                        </>
                    )
                    :
                    <p className='singlePostDescription'> 
                        {
                            post.description +
                            ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt minus accusamus magni quaerat cumque blanditiis, maiores vero sed nihil' +
                            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt minus accusamus magni quaerat cumque blanditiis, maiores vero ' +
                            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt minus accusamus magni quaerat cumque blanditiis, maiores vero sed nihil' +
                            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt minus accusamus magni quaerat cumque blanditiis, maiores vero sed nihil'
                        }
                    </p>
                }
            </div>
        </div>
    )
}

export default SinglePost
