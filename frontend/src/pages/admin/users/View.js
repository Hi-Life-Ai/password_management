import React, { useState, useEffect, useContext } from 'react';
import { Button, Typography, Grid, InputLabel, FormControl, Box, TextField, TextareaAutosize } from '@mui/material';
import { userStyle } from '../../Pagestyle';
import Headtitle from '../navbar/Headtitle';
import Navbar from '../navbar/Navbar';
import Footer from '../navbar/Footer';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/Appcontext';
import axios from 'axios';
import { SERVICE } from '../../../services/Baseservice';
import { toast } from 'react-toastify';

function Adminuserviewlist() {

     // Access
     const { auth } = useContext(AuthContext);

     const [useradd, setUseradd] = useState({});
     const id = useParams().id
 
     // Fetch User
     const fetchUser = async () => {
         try {
             let req = await axios.get(`${SERVICE.USER_SINGLE}/${id}`, {
                 headers: {
                     'Authorization': `Bearer ${auth.APIToken}`
                 },
             }
             );
             setUseradd(req.data.suser);
         }
         catch (err) {
             const messages = err.response.data.message;
             toast.error(messages);
         }
     }
 
     useEffect(() => {
         fetchUser();
     }, [])

    return (
        <Box>
            <Headtitle title={'User View'} />
            <Typography sx={userStyle.HeaderText}>User View</Typography>
            <Box sx={userStyle.container}>
                <form>
                    <Grid container spacing={2} sx={{ padding: '40px 20px' }}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">Staff ID<b style={{ color: "red" }}>*</b></InputLabel>
                            <Grid sx={{ display: "flex" }}>
                                <FormControl size="small" fullWidth>
                                <TextField
                                    sx={userStyle.input}
                                    variant="standard"
                                    value={useradd.userid}
                                    type="text"
                                    name="standard"
                                />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">User name <b style={{ color: "red" }}>*</b></InputLabel>
                            <FormControl size="small" fullWidth>
                                <TextField
                                    sx={userStyle.input}
                                    variant="standard"
                                    type="text" 
                                    value={useradd.username}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">Email</InputLabel>
                            <FormControl size="small" fullWidth>
                                <TextField
                                    sx={userStyle.input}
                                    variant="standard"
                                    type="email"
                                    value={useradd.emailid}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">Role<b style={{ color: "red" }}>*</b></InputLabel>
                            <Grid sx={{display:'flex'}}>
                                <FormControl size="small" fullWidth>
                                    <TextField
                                        variant='standard'
                                        value={useradd.designation}
                                          />
                                </FormControl>
                                </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">Mobile<b style={{ color: "red" }}>*</b></InputLabel>
                            <FormControl size="small" fullWidth>
                                <TextField
                                    sx={userStyle.input}
                                    variant="standard"
                                    type="Number"
                                    value={useradd.mobilenumber}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">Other Contact Number</InputLabel>
                            <FormControl size="small" fullWidth>
                                <TextField
                                    sx={userStyle.input}
                                    variant="standard"
                                    type="Number"
                                    value={useradd.othermobilenumber}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <InputLabel sx={{ m: 1 }}>Profile Image</InputLabel>
                            <Grid sx={{ display: 'flex', justifyContent: 'center',width:'50%', height:'80px' }}><img src={useradd.profileimage} alt="profile image"/></Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <InputLabel htmlFor="component-outlined">Remarks</InputLabel>
                            <FormControl size="small" fullWidth >
                                <TextareaAutosize aria-label="minimum height" minRows={5} mincol={5} style={{ border: '1px solid grey',backgroundColor:'rgba(255,255,255,0.1)' }}
                                    value={useradd.remarks}
                                     />
                            </FormControl>
                        </Grid>
                        <Grid item md={2} xs={12}></Grid>
                        <Grid container sx={userStyle.gridcontainer}>
                            <Grid >
                                <Link to="/admin/user/list"><Button sx={userStyle.buttoncancel}>Back</Button></Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
}

function Adminuserview() {
    return (
        <Box>
            <Navbar />
            <Box sx={{ width: '100%', overflowX: 'hidden' }}>
                <Box component="main" sx={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: "30px", paddingBottom: "30px" }}><br /><br />
                    <Adminuserviewlist /><br /><br /><br />
                </Box>
            </Box>
            <Footer /><br /><br />
        </Box>
    );
}

export default Adminuserview;