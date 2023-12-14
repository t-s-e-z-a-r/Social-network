import React from 'react';
import { TextField, Grid, Button } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate} from "react-router-dom";
import { AuthRequest } from '../../API/Auth';
import { useDispatch } from "react-redux";
import { setCredentials, setUserData } from '../../API/slice';
import API from '../../API';


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
      navigate("/myaccount");
    };
  };

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
        </form>
      </div>
  );
}


export default SignIn;

