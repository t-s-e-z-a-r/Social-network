// import './App.css';
import React from 'react';
import { TextField, Grid, Button } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { redirect } from "react-router-dom";
import { POSTRequest } from '../../API';

function SignUp(props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataObject = {};
    formData.forEach((value, key) => {
      dataObject[key] = value;
    });
    console.log(dataObject)
    if(POSTRequest("users/registration", dataObject)){
      return redirect("/MyAccount");
    };
  };

  return (
      <div id="signUpDiv" style={{margin:"80px 200px", padding:"10px"}}>
        <h1 className='text-center'>Registrate your account</h1>
        <form id="signUpForm" className='d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{width:"100%", padding:"30px 100px"}}>
            <Grid item xs={6}>
              <TextField fullWidth label='First Name' name='first_name' />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='Last Name' name='last_name' />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='Email' name='email' />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='Phone' name='phone' />
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Confirm password'
                name='confirm'
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('confirm')}
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

export default SignUp;

