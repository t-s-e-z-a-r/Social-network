import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import API from '../../../API';

const PostComponent = (props) => {
  const [post, setPost] = useState(props.post);

  const handleLike = async () => {
    console.log("Like");
    const res = await API.PUT("posts", { ...post, liked: !post.liked });
    setPost((prevPost) => ({ ...prevPost, liked: !prevPost.liked }));
  };
  

  return (
    <div key={post.id}>
      <h3>{post.first_name} {post.last_name}</h3>
      <h4>{post.title}</h4>
      <h5>{post.text}</h5>
      <div>
        {post.liked ? (
          <FavoriteIcon onClick={handleLike} />
        ) : (
          <FavoriteBorderIcon onClick={handleLike} />
        )}
      </div>
    </div>
  );
};

export default PostComponent;
