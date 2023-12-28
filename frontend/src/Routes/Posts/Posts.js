import React from 'react';
import { useEffect, useState } from "react";
import API from '../../API';
import PostItem from './components/Item';

function Posts(props) {
    const [posts, setPosts] = useState([]);

    const fetchData = async() =>{
        try{
            const res = await API.GET("posts")
            setPosts(res);
        } catch(error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        fetchData()        
    }, []);

    return (
        <>
            <h2>Post page</h2>
            <div>
                {posts.length > 0 && posts.map((post) => (
                    <PostItem post={post}/>
                ))}
            </div>
        </>
    )
}

export default Posts