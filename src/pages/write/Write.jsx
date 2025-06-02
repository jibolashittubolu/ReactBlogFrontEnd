import './write.scss'

import React, { useState, useContext } from 'react'
import { Add } from '@material-ui/icons'
import write_page from '../../assets/images/write_page.jpg';
import TopBar from '../../components/topbar/TopBar';
import axios from 'axios';
import { aContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

function Write() {
    const navigate = useNavigate()
    const {user} = useContext(aContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [postSuccessMessage, setPostSuccessMessage] = useState('')
    const [file, setFile] = useState(null);



    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost =  {
            username: user.username,
            title: title,
            description: description,
        }
        if (file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            //we append the date object as we require the filename to be always unique
            data.append("name", filename);
            //the above corresponds to the req.body.name
            data.append("file", file);
            //the above corresponds to upload.single("file") in the router post method of the backend
            newPost.photo = filename;
            // the above adds a photo key to the newpost object.
            // remember that this photo key is required in our post Schema
            
            try{
                await axios.post('/upload', data)
            }
            catch(error){
                // return null
            }
        }

        try{
            const res = await axios.post('posts/create', newPost )
            navigate('/post/' + res.data._id)
            //the navigate moves you to the single post page once const res is fulfilled
        }
        catch(error){
            return null
        }

    }

    return (
        <>
        <TopBar />
        <div className='write'>
            { file && 
                (
                    <img
                    className='writeImage'
                    src={URL.createObjectURL(file)}
                    alt='' />
                )
            }
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className='writeFormGroup'>
                    <label className='fileInputLabel' htmlFor='fileInput'>
                        <Add className='fileInputLabelIcon' />
                    </label>
                    <input 
                    type="file"  
                    id='fileInput' 
                    onChange={(event) => setFile(event.target.files[0])} />
                    <input 
                    type="text" 
                    className='writeInput' 
                    placeholder='Title'
                    onChange={(event) => setTitle(event.target.value)}
                    autoFocus={true} />
                </div>
                <hr className='hrLine'/>
                <div className='writeFormGroup'>
                    <textarea 
                    className='writeInput writeText' 
                    placeholder='Tell your story...' 
                    type='text' 
                    onChange={(event) => setDescription(event.target.value)}>
                    </textarea>
                </div>
                <div className='writeSubmitContainer'>
                    <button 
                    className='writeSubmit'
                    type='submit'>
                    Publish
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Write
