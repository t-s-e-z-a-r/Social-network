import React from 'react';
import { TextField, Grid, Button } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate} from "react-router-dom";
import { AuthRequest } from '../../API/Auth';
import { useDispatch } from "react-redux";
import { setCredentials } from '../../API/slice';
import { GoogleLogin } from '@react-oauth/google';
import {
  LoginSocialFacebook,
} from 'reactjs-social-login'

import {
  FacebookLoginButton
} from 'react-social-login-buttons'


function SignIn(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  async function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataObject = {};
    formData.forEach((value, key) => {
      dataObject[key] = value;
    });
    const response = await AuthRequest("login", dataObject);
    const responseData = await response.json()
    if (response && response.ok){
      dispatch(setCredentials(responseData));
      navigate("/myaccount");
    };
  };
  

  const handleGoogleResponse = async(data) => {
    const response = await AuthRequest("google-login", {"id_token": data.credential});
    const responseData = await response.json()
    if (response && response.ok){
      dispatch(setCredentials(responseData));
      navigate("/myaccount");
    }
  }

  const handleFacebookResponse = async({provider, data}) => {
    const userData = await fetch(`https://graph.facebook.com/v13.0/${data.userID}?fields=id,name,email,picture&access_token=${data.accessToken}`)
    const userDataJSON = await userData.json();
    const response = await AuthRequest("facebook-login", {"user": userDataJSON});
    const responseData = await response.json()
    if (response && response.ok){
      dispatch(setCredentials(responseData));
      navigate("/myaccount");
    }
  }

  return (
      <div id="signUpDiv" style={{margin:"80px 200px", padding:"10px"}}>
        <h1 className='text-center'>Login to your account</h1>
        <form id="signUpForm" className='d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{width:"100%", padding:"30px 100px"}}>
            <Grid item xs={6}>
              <TextField fullWidth label='Email' name='email' />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('password')}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button type='submit' variant="contained" style={{width:"300px", marginBottom:"30px"}}>Submit</Button>
          <GoogleLogin
            onSuccess={handleGoogleResponse}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
           <LoginSocialFacebook
            isOnlyGetToken
            appId="910030630517937"
            onResolve={handleFacebookResponse}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>

        </form>
      </div>
  );
}


export default SignIn;

