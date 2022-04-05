import './register.scss'
import React, {useState} from 'react';
import TopBar from '../../components/topbar/TopBar';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError(false)
        try{
            const response = await axios.post('/auth/register', {
                username,
                email,
                password,
            })
            response.data && navigate('/login')
            //the above single line ensures a redirect to the login page if the server provides us with a valid response
        }
        catch(error){
            setError(true)
        }
    }

    return (
        <>
        <TopBar/>
        <div className='register'>
            <span className='registerTitle'>Register</span>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                type='text' 
                className='registerInput' 
                placeholder='Enter your username...'
                onChange={(event) => setUsername(event.target.value) } />
                <label>Email</label>
                <input 
                type='email' 
                className='registerInput' 
                placeholder="Enter your email..."  
                onChange={(event) => setEmail(event.target.value)}
                />
                <label>Password</label>
                <input 
                type='password' 
                className='registerInput' 
                placeholder="Enter your password..." 
                onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit" className='registerButton'>
                    Register
                </button>

            </form>
            {
                //the below wou
                error && <span style={{color:"red", marginTop:"14px"}}>something went wrong, try again</span>
            }
            <button onClick={() => navigate('/login')} className='registerLoginButton'>Login</button>
        </div>
        </>
        );
}

export default Register;
