import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import API from '../../API';
import { setUserData } from '../../API/slice';

function MyAccount(props) {
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        try {
            const res = await API.GET("users/myaccount");
            console.log(res)
            if (res.ok) {
                const data = await res.json();
                console.log("Response data:", data);
                dispatch(setUserData(data))
                
            } else {
                console.error("Error:", res.status, res.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div>
            <h4>You have entered in your account</h4>
            <button onClick={handleSubmit}>Get</button>
        </div>
    );
}

export default MyAccount;
