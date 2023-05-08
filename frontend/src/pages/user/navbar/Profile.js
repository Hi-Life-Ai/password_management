import React, { useState, useEffect, useContext } from 'react';
import { Button, Typography, Grid, InputLabel, FormControl, Box, TextField, TextareaAutosize, Dialog, DialogContent, DialogActions } from '@mui/material';
import { userStyle } from '../../Pagestyle';
import Headtitle from '../navbar/Headtitle';
import Navbar from '../navbar/Navbar';
import Footer from '../navbar/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { AuthContext } from '../../../context/Appcontext';
import axios from 'axios';
import { SERVICE } from '../../../services/Baseservice';
import { toast } from 'react-toastify';

function Userprofilelist() {

    const backPage = useNavigate();

    // Access 
    const { auth } = useContext(AuthContext);

    const [file, setFile] = useState();
    const [designation, setDesignation] = useState();
    const [useradd, setUseradd] = useState({
        userid: "", emailid: "", designation: "", username: "", password: "", mobilenumber: "", othermobilenumber: "",profileimage: "", remarks: ""
    })
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [showAlert, setShowAlert] = useState()
    const handleOpen = () => { setIsErrorOpen(true); };
    const handleClose = () => { setIsErrorOpen(false); };
    const [fetchsavedesignation, setFetchsavedesignation] = useState("");

    const id = useParams().id

    // Fetch user
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

    // Fetch designation
    const fetchDesignation = async () => {
        try {
            let req_designation = await axios.get(`${SERVICE.DESIGNATIONS}`, {
                headers: {
                    'Authorization': `Bearer ${auth.APIToken}`
                }
            });
            let result = req_designation.data.designations.filter((data) => {
                if(data.designationname !== 'Admin' && data.designationname !== 'Superadmin'){
                  return data
                }
            })
          setDesignation(
              result?.map((d) => ({
                   ...d,
                   label: d.designationname,
                   value: d.designationname,
               }))
           );
        } catch (err) {
            const messages = err.response.data.message;
            toast.error(messages);
        }
    }

    useEffect(
        () => {
            fetchDesignation();
        }, [fetchsavedesignation]
    )

    // Update user without password
    const updateUser = async () => {
        try {

            let req = await axios.put(`${SERVICE.USERPW_SINGLE}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.APIToken}`
                },
                userid: String(useradd.userid),
                emailid: String(useradd.emailid),
                designation: String(useradd.designation),
                username: String(useradd.username),
                mobilenumber: Number(useradd.mobilenumber),
                othermobilenumber: Number(useradd.othermobilenumber),
                profileimage: String(useradd.profileimage),
                remarks: String(useradd.remarks),
            });

            setUseradd(req.data);
            backPage('/');

            toast.success(req.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
        catch (err) {
            const messages = err.response.data.message;
            toast.error(messages);
        }
    }

    // Image Upload
    function handleChange(e) {
        let profileimage = document.getElementById("profileimage")
        var path = (window.URL || window.webkitURL).createObjectURL(profileimage.files[0]);
        toDataURL(path, function (dataUrl) {
            profileimage.setAttribute('value', String(dataUrl));
            setUseradd({ ...useradd, profileimage: String(dataUrl) })
            return dataUrl;
        })
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    const handleMobile = (e) => {
        if (e.length > 10) {
            setShowAlert("Mobile number can't have more than 10 characters!")
            handleOpen();
            let num = e.slice(0, 10);
            setUseradd({ ...useradd, mobilenumber: num })
        }
    }

    const handleotherMobile = (e) => {
        if (e.length > 10) {
            setShowAlert("Mobile number can't have more than 10 characters!")
            handleOpen();
            let num = e.slice(0, 10);
            setUseradd({ ...useradd, othermobilenumber: num })
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (useradd.username === "") {
            setShowAlert("Please enter user name!");
            handleOpen();
        } else if (useradd.password === "") {
            setShowAlert("Please enter password!");
            handleOpen();
        } else if (useradd.designation === "") {
            setShowAlert("Please select role!");
            handleOpen();
        } else if (useradd.mobilenumber === "" || useradd.mobilenumber === 0) {
            setShowAlert("Please enter mobile number!");
            handleOpen();
        }
        else{
            updateUser();
        }
    }

    return (
        <Box>
            <Headtitle title={'Profile'} />
            <Typography sx={userStyle.HeaderText}>User Profile</Typography>
            <Box sx={userStyle.container}>
                <form onSubmit={handleUpdate}>
                    <Grid container spacing={2} sx={{
                        padding: '40px 20px'
                    }}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">User ID<b style={{ color: "red" }}>*</b></InputLabel>

                            <Grid sx={{ display: "flex" }}>
                                <FormControl size="small" fullWidth>
                                    <TextField
                                        variant="standard"
                                        value={useradd.userid}
                                        type="text"
                                        name="standard"
                                    />
                                </FormControl>
                            </Grid>
                            <Typography variant="caption">Leave blank to auto generate</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">User name <b style={{ color: "red" }}>*</b></InputLabel>
                            <FormControl size="small" fullWidth>
                                <TextField
                                    variant="standard"
                                    type="text"
                                    autoComplete="false"
                                    value={useradd.username}
                                />
                            </FormControl>
                            <Typography variant="caption">Login user name!</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">Email</InputLabel>
                            <FormControl size="small" fullWidth>
                                <TextField
                                    sx={userStyle.input}
                                    variant="standard"
                                    type="email"
                                    value={useradd.emailid}
                                    onChange={(e) => { setUseradd({ ...useradd, emailid: e.target.value }); }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">Mobile<b style={{ color: "red" }}>*</b></InputLabel>
                            <FormControl size="small" fullWidth>
                                <TextField
                                    sx={userStyle.input}
                                    variant="standard"
                                    type="Number"
                                    value={useradd.mobilenumber}
                                    onChange={(e) => { setUseradd({ ...useradd, mobilenumber: e.target.value }); handleMobile(e.target.value) }}
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
                                    onChange={(e) => { setUseradd({ ...useradd, othermobilenumber: e.target.value }); handleotherMobile(e.target.value) }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <InputLabel sx={{ m: 1 }}>Profile Image</InputLabel>
                            <Grid sx={{ display: 'flex', justifyContent: 'center',width:'50%', height:'80px' }}><img src={file ? file : useradd.profileimage} alt="profile image"/></Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} sx={{marginTop:"40px"}}>
                        <Grid sx={{ display: 'flex', justifyContent: "center" }}>
                                <Button component="label" sx={userStyle.buttonadd} size={"small"}>
                                    Upload
                                    <input type='file' id="profileimage" name='file' hidden onChange={handleChange} />
                                </Button>
                                <Button component="label" sx={userStyle.buttoncancel} size={"small"} onClick={(e) => {setFile(""); setUseradd({...useradd, profileimage:""});}}>
                                    Reset
                                </Button>
                            </Grid> <br />
                            <Typography variant='body2' style={{ marginTop: "5px", justifyContent: "center", textAlign:"center" }} align="left">Max File size: 5MB</Typography>
                            <Typography variant='body2' style={{ marginTop: "5px", justifyContent: "center", textAlign:"center" }} align="left">Allowed File: .jpeg, .jpg, .png</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <InputLabel htmlFor="component-outlined">Remarks</InputLabel>
                            <FormControl size="small" fullWidth >
                                <TextareaAutosize aria-label="minimum height" minRows={5} mincol={5}
                                    value={useradd.remarks}
                                    onChange={(e) => { setUseradd({ ...useradd, remarks: e.target.value }); }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={2} xs={12}></Grid>
                        <Grid container sx={userStyle.gridcontainer}>
                            <Grid >
                                <Link to="/"><Button sx={userStyle.buttoncancel}>CANCEL</Button></Link>
                                <Button sx={userStyle.buttonadd} type="submit">Update</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Box>
                <Dialog
                    open={isErrorOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                        <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} />
                        <Typography variant="h6" >{showAlert}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="error" onClick={handleClose} >ok</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}

function Userprofile() {
    return (
        <Box  >
            <Navbar />
            <Box sx={{ width: '100%', overflowX: 'hidden'}}>
                <Box component="main" sx={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: "30px", paddingBottom: "30px" }}><br /><br />
                    <Userprofilelist /><br /><br /><br />
                </Box>
            </Box>
            <Footer /><br /><br />
        </Box>
    );
}

export default Userprofile;