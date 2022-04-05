import './settings.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import { AccountCircleOutlined } from '@material-ui/icons'

import robot_settings from '../../assets/images/robot_settings.jpg';
import TopBar from '../../components/topbar/TopBar';
import { aContext } from '../../context/Context';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const PublicFolderURL = "http://localhost:5000/submittedimages/"
    const navigate = useNavigate()
    const {user, dispatch, isFetching} = useContext(aContext)
    //the user above is the logged in user object which is accessible by all react components

    const [file, setFile] = useState(null)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [updatedMessageSuccess, setUpdatedMessageSuccess] = useState(false)
    const [updatedMessageFailed, setUpdatedMessageFailed] = useState(false)
    //line 23 ensures a success message is displayed
    //line 24 ensures a failure message is displayed

    const handleSubmit = async (e) => {
        e.preventDefault()
        //prevent default ensures the page is not reloaded on submitting the
        dispatch({type:"UPDATE_START"})
        const updatedUser =  {
            userID: user._id,
            username: username,
            email: email,
            password: password,
        }
        if (file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            //we append the date object as we require the filename to be always unique
            data.append("name", filename);
            //the above corresponds to the req.body.name
            data.append("file", file);
            //the above corresponds to upload.single("file") in the router post method of the backend
            updatedUser.profilePic = filename;
            // the above adds a photo key to the newpost object.
            // remember that this photo key is required in our post Schema
            
            try{
                await axios.post('/upload' , data)
            }
            catch(error){
                dispatch({type:'UPDATE_FAILURE'})
            }

        }
        // else{
        try{
            const res = await axios.put('/users/' + user._id , updatedUser);
            setUpdatedMessageSuccess(true)
            dispatch({type:"UPDATE_SUCCESS", payload:res.data})
                // await setUpdatedMessageDisplay('true');
            setTimeout(() => {
                setUpdatedMessageSuccess(false);
            }, 500);
        }
        catch(error){
            setUpdatedMessageFailed(true)
            setTimeout(() => {
                setUpdatedMessageFailed(false)
            }, 1000);
                // return null
        }
            
        // }
    }



    return (
        <>
        <TopBar/>
        <div className='settings'>
            <div className='settingsWrapper'>
                <div className='settingsTitle'>
                    <span className='settingsTitleDelete'>Delete Your Account</span>
                    <span className='settingsTitleUpdate'>Update Your Account</span>
                </div>
                <form className='settingsForm' onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className='settingsProfilePicture'>
                        {
                            file 
                            ?
                            <img className='settingsProfilePictureImage' 
                            src={URL.createObjectURL(file)}
                            alt='' />   
                            :
                            <img className='settingsProfilePictureImage' 
                            src={PublicFolderURL + user.profilePic}
                            alt='' /> 
                            //instead of null, we should be returning the current profile pic of the user. 
                            //If the user has no profile picture we should create a nested conditional to represent a null state. ie if no user.profilePic
                        }
                        <label htmlFor='fileInput'>
                            <AccountCircleOutlined className='settingsProfilePictureIcon' />
                        </label> 
                        <input type="file" 
                        id="fileInput" 
                        onChange={(event) => setFile(event.target.files[0]) } />
                    </div>
                    <label>Username</label>
                    <input 
                    type='text' 
                    placeholder={user?.username}
                    onChange={(event) => setUsername(event.target.value) } />
                    <label>Email</label>
                    <input 
                    type='email' 
                    placeholder={user?.email}
                    onChange={(event) => setEmail(event.target.value)} />
                    <label>Password</label>
                    <input 
                    type='password'
                    onChange={(event) => setPassword(event.target.value) }
                    />
                    {/* the below displays the updatedMessage */}
                    {
                        updatedMessageSuccess ?
                        <p style={{display:updatedMessageSuccess, textAlign:'center'}}>Profile Updated</p> :
                        null
                    }
                    {
                        updatedMessageFailed ?
                        <p style={{display:updatedMessageFailed, textAlign:'center'}}>Update Failed</p>:
                        null
                    }
                    
                    <button 
                    className='settingsSubmit' 
                    style={{cursor: isFetching ? 'not-allowed' : 'pointer'}}
                    type='submit'
                    disabled={isFetching}>Update</button>
                </form>
            </div>
            <Sidebar/>
        </div>
        </>
    )
}

export default Settings

