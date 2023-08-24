import React, { useState, useContext } from 'react';
import { Box, FormControl, InputAdornment, IconButton, Input, Grid, InputLabel, Button } from '@mui/material';
import { loginStyle } from './Loginstyle';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Appcontext';
import Headtitle from './Headtitle';
import { AUTH } from '../services/Authservice';
import "../App.css"
import PersonPinIcon from '@mui/icons-material/PersonPin';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [signin, setSignin] = useState({ username: "", password: "" });
    const [showAlert, setShowAlert] = useState("");
    const { auth, setAuth } = useContext(AuthContext);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const { auth, setAuth } = useContext(AuthContext);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const backPage = useNavigate();

    const fetchHandler = async () => {
        try {
            const response = await axios.post(AUTH.LOGIN, {
                username: String(signin.username),
                password: String(signin.password)
            });
            //set login data to local storage
            localStorage.setItem('APIToken', response.data.token);
            localStorage.setItem('LoginUserId', response.data.user._id);
            localStorage.setItem('LoginUserDesignation', response.data.user.designation);
            localStorage.setItem('LoginUseruniqid', response.data.user.userid);
            
            //change login state
            setAuth({ ...auth, loginState: true, APIToken: response.data.token, loginuserid: response.data.user._id, loginuserdesignation: response.data.user.designation, loginuseruniqid: response.data.user.userid });
        
            setSignin(response);
            backPage('/');
        }
        catch (err) {
            const messages = err.response.data.message;
            setShowAlert(messages);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (signin.username == "") {
            setShowAlert("Please enter username!");
        } else if (signin.password == "") {
            setShowAlert("Please enter password!");
        } else {
            setShowAlert("");
            fetchHandler();
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', }}>
                <Headtitle title={'Login'} />
                <Box sx={loginStyle.loginbox}>
                    <Grid>
                        <form onSubmit={handleSubmit}>
                            <Grid>
                                <PersonPinIcon sx={loginStyle.iconstyle} />
                            </Grid>
                            <p style={{ color: 'red' }}>{showAlert}</p>
                            <FormControl variant="outlined" fullWidth sx={{ maxWidth: '100%' }}>
                                <InputLabel htmlFor="standard-adornment-password" sx={{ color: '#1976d2', letterSpacing: "1px", }} >User Name</InputLabel>
                                <Input
                                    sx={{ color: '#1976d2', letterSpacing: "2px", backgroundColor: "a09e9e" }}
                                    id="standard-password-input"
                                    label="User Name"
                                    type="text"
                                    value={signin.username}
                                    onChange={(e) => { setSignin({ ...signin, username: e.target.value }); setShowAlert(""); }}
                                    autoComplete="current-password"
                                    variant="standard"
                                    size='small'
                                />
                            </FormControl><br /><br />
                            <FormControl variant="outlined" fullWidth sx={{ maxWidth: '100%' }}>
                                <InputLabel htmlFor="standard-adornment-password" sx={{ color: '#1976d2', letterSpacing: "1px" }} >Password</InputLabel>
                                <Input
                                    sx={{ color: '#1976d2', letterSpacing: "3px" }}
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={signin.password}
                                    size='small'
                                    onChange={(e) => { setSignin({ ...signin, password: e.target.value }); setShowAlert(""); }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff style={{ color: "#1976d2" }} /> : <Visibility style={{ color: "#1976d2" }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Button variant="contained" sx={loginStyle.signinBtn} type="submit">Signin</Button><br />
                        </form>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default Login;