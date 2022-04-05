import './login.scss'
import React from 'react';
import TopBar from '../../components/topbar/TopBar';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { aContext } from '../../context/Context';
import axios from 'axios';


function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {user, dispatch, isFetching} = useContext(aContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"})

        try{
            const res = await axios.post("/auth/login", {
                username: username,
                password: password
            })
            await dispatch(({type:"LOGIN_SUCCESS", payload:res.data }))
            navigate('/')
            //the navigate above is to take the user to the homepage once the login is successful and the payload set to the user
        } 
        catch(error){
            dispatch({type:"LOGIN_FAILURE"})
        }
    }

    // console.log(isFetching)
    // console.log(user)
    // console.log(error)

    return (
        <>
        <TopBar/>
        <div className='login'>
            <span className='loginTitle'>Login</span>
            <form className='loginForm' onSubmit={handleSubmit} >
                <label>Username</label>
                <input 
                type='text' 
                className='loginInput' 
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value) }  />
                <label>Password</label>
                <input 
                type='password' 
                className='loginInput' 
                placeholder="Enter your password" 
                onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                className='loginButton'
                disabled={isFetching}
                type="submit" >
                Login
                </button>
            </form>
            <button 
             className='loginRegisterButton' 
             onClick={()=> navigate('/register')} >
             Register
             </button>
        </div>
        </>
    );
}

export default Login;
