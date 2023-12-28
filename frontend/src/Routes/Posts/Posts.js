import React from 'react';
import { useEffect, useState } from "react";
import API from '../../API';

function Posts(props) {
    const [posts, setPosts] = useState([]);

    const fetchData = async() =>{
        try{
            const res = await (await API.GET("posts")).json()
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
                    <div key={post.id}>
                        <h3>{post.first_name} {post.last_name}</h3>
                        <h4>{post.title}</h4>
                        <h5>{post.text}</h5>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Posts