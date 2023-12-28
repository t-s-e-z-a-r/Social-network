import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../API/slice';
import { useNavigate } from 'react-router-dom';


function Error(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("Props", props)
  return (
    <div id='error'>
    <h5 style={{margin: "0px"}}>
      {props.error.errorCode}: {props.error.errorText}
    </h5>
  </div>
  );
}

export default Error;
