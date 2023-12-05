// import './App.css';
import React from 'react';
import { TextField, Grid, Button } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { POSTRequest } from '../../API';
import { useNavigate} from "react-router-dom";

function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

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
    const response = await POSTRequest("users/login", dataObject);
    if (response && response.ok){
      navigate("/MyAccount");
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

