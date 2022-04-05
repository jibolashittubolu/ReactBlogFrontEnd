import './home.scss'

import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from "axios"
import {useLocation} from "react-router-dom";

function Home() {
    const [fetchedPosts, setFetchedPosts] = useState([])

    const location = useLocation()
    const search = location.search
    // as far is i'm concerned, search variable is currently useless as search is observed empty in location.search.
    //Also the axios.get uses the /posts url. The search is empty, hence we are experiencing no errors. It might be better to remove it from the axios.get but for now, I dont understand how it got there in the first place

    //Alas, serach is the query added behind the base url e.g ?category=node


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get("/posts" + search);
            setFetchedPosts(response.data)
        } 
        return fetchPosts()
    }, [search])
    
    // the dependency used here is search? 
    //Why? so that when the search value e.g(category=node) changes, the component(i.e homepage) is updated to reflect the search.

    return (
        <>
            <Header />
            <div className="homepage">
                {
                    fetchedPosts.length > 0 ?
                    <Posts propFetchedPosts={fetchedPosts}/> :
                    <div className='postUnavailableContainer'>
                      <h1 className='postUnavailable'>No Posts are Available for Your Search</h1>
                    </div>
                }
                <Sidebar/>
            </div>
        </>
    )
}

export default Home
