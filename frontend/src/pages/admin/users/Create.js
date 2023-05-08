import React, { useState, useEffect, useContext } from 'react';
import { Button, Typography, IconButton, InputAdornment, Input,Grid, InputLabel, FormControl, Box,  TextField, TextareaAutosize, Dialog, DialogContent, DialogActions } from '@mui/material';
import { userStyle } from '../../Pagestyle';
import { AuthContext } from '../../../context/Appcontext';
import Headtitle from '../navbar/Headtitle';
import Selects from 'react-select';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { SERVICE } from '../../../services/Baseservice';
import Createdesignationmod from './Createdesignation';
import Navbar from '../navbar/Navbar';
import Footer from '../navbar/Footer';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Adminusercreatelist() {

    const { auth } = useContext(AuthContext);

    const [users, setusers] = useState();
    const [designation, setDesignation] = useState();
    const [useradd, setUseradd] = useState({
        userid:"",emailid:"",designation:"None", username:"",password:"",mobilenumber:"",othermobilenumber:"",profileimage:"",remarks:""})
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [fetchsavedesignation, setFetchsavedesignation] = useState("");
    const [file, setFile] = useState();

    const [showAlert, setShowAlert] = useState()
    const handleOpen = () => { setIsErrorOpen(true); };
    const handleClose = () => { setIsErrorOpen(false); };


    let newval = "US0001";
    const backPage = useNavigate();

    //  Password field
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

     // user
     const fetchAllUser = async () => {
        try {
            let req_user = await axios.get(`${SERVICE.USERS}`, {
                headers: {
                    'Authorization': `Bearer ${auth.APIToken}`
                }
            });
            setusers(req_user.data.users);
        } catch (err) {
            const messages = err.response.data.message;
            toast.error(messages);
        }
    }

    const fetchDesignation = async () => {
        try {
            let req_designation = await axios.get(`${SERVICE.DESIGNATIONS}`, {
                headers: {
                    'Authorization': `Bearer ${auth.APIToken}`
                }
            });
            let result = req_designation.data.designations.filter((data, index)=>{
                return data.designationname != "Admin"
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
        ()=>{
            fetchDesignation();
        },[fetchsavedesignation]
    )

    useEffect(
        ()=>{
            fetchAllUser();
        },[]
    )

    var regex = /[`+!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

    const handleValidationUserName = (e) => {
        let val = e.target.value;
        let numbers = new RegExp('[0-9]')
        if (e.target.value.match(numbers)) {
            setShowAlert("Please Enter Letter only! (a-z)")
            handleOpen();
            let num = val.length;
            let value = val.slice(0, num - 1)
            setUseradd({ ...useradd, username: value })
        }
        else if (regex.test(e.target.value)) {
            setShowAlert("Please enter letter only! (a-z)")
            handleOpen();
            let num = val.length;
            let value = val.slice(0, num - 1)
            setUseradd({ ...useradd, username: value })
        }
    }
    const handleMobile = (e) => {
        if (e.length > 10) {
            setShowAlert("Mobile number can't have more than 10 characters!")
            handleOpen();
            let num = e.slice(0, 10);
            setUseradd({ ...useradd, mobilenumber: num })
        }
    }
    const handleOtherMobile = (e) => {
        if (e.length > 10) {
            setShowAlert("Mobile number can't have more than 10 characters!")
            handleOpen();
            let num = e.slice(0, 10);
            setUseradd({ ...useradd, othermobilenumber: num })
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

    // user data add to database
    const sendUser = async () => {
        try {
            let req_user = await axios.post(SERVICE.USER_CREATE, {
                    headers: {
                        'Authorization':`Bearer ${auth.APIToken}`
                        },
                    userid:String(newval),
                    emailid: String(useradd.emailid),
                    designation: String(useradd.designation),
                    username: String(useradd.username),
                    password: String(useradd.password),
                    mobilenumber: Number(useradd.mobilenumber),
                    othermobilenumber: Number(useradd.othermobilenumber),
                    profileimage: String(useradd.profileimage),
                    remarks: String(useradd.remarks),
            });
            setUseradd(req_user.data);
            backPage('/admin/user/list');
            
            toast.success(req_user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
        catch (err) {
            const messages = err.response.data.message;
            setShowAlert(messages);
            handleOpen();
        }
    }

    // user data add to database
    const sendOtherUser = async () => {
        try {
            let req_user = await axios.post(SERVICE.USER_CREATE, {
                headers: {
                    'Authorization':`Bearer ${auth.APIToken}`
                    },
                userid:String(newval),
                emailid: String(useradd.emailid),
                designation: String(useradd.designation),
                username: String(useradd.username),
                password: String(useradd.password),
                mobilenumber: Number(useradd.mobilenumber),
                othermobilenumber: Number(useradd.othermobilenumber),
                profileimage: String(useradd.profileimage),
                remarks: String(useradd.remarks),
        });
            await fetchAllUser();
            toast.success(req_user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            setUseradd({userid:"",emailid:"",designation:"None", username:"",password:"",mobilenumber:"",othermobilenumber:"",profileimage:"",remarks:""});
            setFile("");
        }
        catch (err) {
            const messages = err.response.data.message;
            setShowAlert(messages);
            handleOpen();
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(useradd.username === ""){
            setShowAlert("Please enter user name!");
            handleOpen();
        }else if(useradd.password === ""){
            setShowAlert("Please enter password!");
            handleOpen();
        }else if(useradd.designation === ""){
            setShowAlert("Please select role!");
            handleOpen();
        }else if(useradd.mobilenumber === "" || useradd.mobilenumber == 0){
            setShowAlert("Please enter mobile number!");
            handleOpen();
        }else{
            sendUser();
        }
    }

    const handleAddother = ()=>{
        if(useradd.username == ""){
            setShowAlert("Please enter user name!");
            handleOpen();
        }else if(useradd.password === ""){
            setShowAlert("Please enter password!");
            handleOpen();
        }else if(useradd.designation === ""){
            setShowAlert("Please select role!");
            handleOpen();
        }else if(useradd.mobilenumber === "" || useradd.mobilenumber === 0){
            setShowAlert("Please enter mobile number!");
            handleOpen();
        }else{
            sendOtherUser();
        }
    }

    return (
        <Box>
            <Headtitle title={'User Create'} />
            <Typography sx={userStyle.HeaderText}>User Create</Typography>
            <Box sx={userStyle.container}>
                <form>
                    <Grid container spacing={2} sx={{ padding: '40px 20px' }}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">User ID<b style={{ color: "red" }}>*</b></InputLabel>
                            {users && (
                                users.map(
                                    () => {
                                        let strings = 'US';
                                        let refNo = users[users.length - 1].userid;
                                        let digits = (users.length + 1).toString();
                                        const stringLength = refNo.length;
                                        let lastChar = refNo.charAt(stringLength - 1);
                                        let getlastBeforeChar = refNo.charAt(stringLength - 2);
                                        let getlastThreeChar = refNo.charAt(stringLength - 3);
                                        let lastBeforeChar = refNo.slice(-2);
                                        let lastThreeChar = refNo.slice(-3);
                                        let lastDigit = refNo.slice(-4);
                                        let refNOINC = parseInt(lastChar) + 1
                                        let refLstTwo = parseInt(lastBeforeChar) + 1;
                                        let refLstThree = parseInt(lastThreeChar) + 1;
                                        let refLstDigit = parseInt(lastDigit) + 1;
                                        if (digits.length < 4 && getlastBeforeChar == 0 && getlastThreeChar == 0) {
                                            refNOINC = ("000" + refNOINC).substr(-4);
                                            newval = strings + refNOINC;
                                        } else if (digits.length < 4 && getlastBeforeChar > 0 && getlastThreeChar == 0) {
                                            refNOINC = ("00" + refLstTwo).substr(-4);
                                            newval = strings + refNOINC;
                                        } else if (digits.length < 4 && getlastThreeChar > 0) {
                                            refNOINC = ("0" + refLstThree).substr(-4);
                                            newval = strings + refNOINC;
                                        } else {
                                            refNOINC = (refLstDigit).substr(-4);
                                            newval = strings + refNOINC;
                                        }
                                    }))}
                            <Grid sx={{ display: "flex" }}>
                                <FormControl size="small" fullWidth>
                                <TextField
                                    sx={userStyle.input}
                                    variant="standard"
                                    value={newval}
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
                                    sx={userStyle.input}
                                    variant="standard"
                                    type="text"
                                    value={useradd.username}
                                    onChange={(e) => { setUseradd({ ...useradd, username: e.target.value }); handleValidationUserName(e)}}
                                />
                            </FormControl>
                            <Typography variant="caption">Login user name!</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">Password <b style={{ color: "red" }}>*</b></InputLabel>
                            <FormControl size="small" fullWidth>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                        >
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                    value={useradd.password}
                                    onChange={(e) => { setUseradd({ ...useradd, password: e.target.value });}}
                                    inputProps={{
                                        autoComplete: 'new-password',
                                        form: {
                                          autoComplete: 'off',
                                        },
                                      }}
                                />
                            </FormControl>
                            <Typography variant="caption">This password is used for login!</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">Email</InputLabel>
                            <FormControl size="small" fullWidth>
                                <TextField
                                    sx={userStyle.input}
                                    variant="standard"
                                    type="email"
                                    value={useradd.emailid}
                                    onChange={(e) => { setUseradd({ ...useradd, emailid: e.target.value });}}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <InputLabel htmlFor="component-outlined">Role<b style={{ color: "red" }}>*</b></InputLabel>
                            <Grid sx={{display:'flex'}}>
                                <FormControl size="small" fullWidth>
                                    <Selects
                                        variant='standard'
                                        options={designation}
                                        onChange={(e) => { setUseradd({...useradd, designation:e.value})}}
                                    />
                                </FormControl>
                                <Grid sx={userStyle.spanIcons}><Createdesignationmod  setFetchsavedesignation={setFetchsavedesignation}/></Grid>
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
                                    onChange={(e) => { setUseradd({ ...useradd, othermobilenumber: e.target.value }); handleOtherMobile(e.target.value)}}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <InputLabel sx={{ m: 1 }}>Profile Image</InputLabel>
                            <Grid sx={{ display: 'flex', justifyContent: 'center',width:'50%', height:'80px' }}><img src={file} alt="profile image"/></Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Grid sx={{ display: 'flex', justifyContent: "center", marginTop:"20px" }}>
                                <Button component="label" sx={userStyle.buttonadd} size={"small"}>
                                    Upload
                                    <input type='file' id="profileimage" name='file' hidden onChange={handleChange} />
                                </Button>
                                <Button component="label" sx={userStyle.buttoncancel} size={"small"} onClick={(e) => setFile("")}>
                                    Reset
                                </Button>
                            </Grid> <br />
                            <Typography variant='body2' style={{ marginTop: "5px" }} align="left">Max File size: 5MB</Typography>
                            <Typography variant='body2' style={{ marginTop: "5px" }} align="left">Allowed File: .jpeg, .jpg, .png</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <InputLabel htmlFor="component-outlined">Remarks</InputLabel>
                            <FormControl size="small" fullWidth >
                                <TextareaAutosize aria-label="minimum height" minRows={5} mincol={5} style={{ border: '1px solid grey',backgroundColor:'rgba(255,255,255,0.1)' }}
                                    value={useradd.remarks}
                                    onChange={(e) => { setUseradd({ ...useradd, remarks: e.target.value });}}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={2} xs={12}></Grid>
                        <Grid container sx={userStyle.gridcontainer}>
                            <Grid >
                                <Link to="/admin/user/list"><Button sx={userStyle.buttoncancel}>CANCEL</Button></Link>
                                <Button sx={userStyle.buttonadd} type="button" onClick={handleAddother} >SAVE AND ADD ANOTHER</Button>
                                <Button sx={userStyle.buttonadd} type="button" onClick={handleSubmit} >SAVE</Button>
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

function Adminusercreate() {
    return (
        <Box  >
            <Navbar />
            <Box sx={{ width: '100%', overflowX: 'hidden' }}>
                <Box component="main" sx={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: "30px", paddingBottom: "30px" }}><br /><br />
                    <Adminusercreatelist /><br /><br /><br />
                </Box>
            </Box>
            <Footer /><br /><br />
        </Box>
    );
}

export default Adminusercreate;