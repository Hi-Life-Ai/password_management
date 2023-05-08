
import React, { useState, useEffect, useContext } from 'react';
import { Box, FormControl, Button, Grid, Typography,InputLabel, Dialog, DialogContent, DialogActions } from '@mui/material';
import Footer from '../navbar/Footer';
import { userStyle } from '../../Pagestyle';
import { toast } from "react-toastify";
import { AuthContext } from '../../../context/Appcontext';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import axios from "axios";
import Navbar from '../navbar/Navbar';
import Selects from "react-select";
import { SERVICE } from '../../../services/Baseservice'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Headtitle from '../navbar/Headtitle';

function AssignedPassword() {
  const [user, setUser] = useState([])
  const [folder, setFolder] = useState([])
   // Access 
   const { auth } = useContext(AuthContext);

  const [assigned, setAssigned] = useState({
    username: "", useruniqid: ""
  })
  const [selectedValueedit, setSelectedValueedit] = useState([]);
  //error popup
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [showAlert, setShowAlert] = useState()
  const handleErrorOpen = () => { setIsErrorOpen(true); };
  const handleErrorClose = () => { setIsErrorOpen(false); };
  //Share popup
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleOpen = () => { 
    if(assigned.username == ""){
        setShowAlert("Please select user name!");
        handleErrorOpen();
    }else if(selectedValueedit.length == 0){
        setShowAlert("Please select atleast one folder!");
        handleErrorOpen();
    }else{
        setShowAlert("");
        setIsDeleteOpen(true);
    }
   };
  const handleClose = () => { setIsDeleteOpen(false) };


  const addAssigned = async () => {
    try {
      let req = await axios.post(SERVICE.ASSIGNPASSWORD_CREATE, {
        headers: {
            'Authorization': `Bearer ${auth.APIToken}`
        },
      username: String(assigned.username),
      userid: [...selectedValueedit],
      useruniqid: String(assigned.useruniqid)
    })
    setAssigned(req.data)
   
    handleClose()
    toast.success(req.data.message, {
      position: toast.POSITION.TOP_CENTER
    });
    } catch (err) {
      const messages = err.data.response.messages
      toast.err(messages);
    }
  }

  const fetchuser = async () => {

    try {
      let res = await axios.get(SERVICE.USERS,{
        headers: {
            'Authorization': `Bearer ${auth.APIToken}`
        }

      })

      let result = res.data.users.filter((data, index)=>{
        return data.designation != "Admin"
      })
      setUser(
        result.map((d) => ({

          ...d,
          label: d.username,
          value: d.username

        }))
      )

    } catch (err) {
      const messages = err.response.data.messages
      toast.err(messages);
    }

  }

  const fetchfolder = async () => {

    try {
      let res = await axios.get(SERVICE.FOLDER,{
        headers: {
            'Authorization': `Bearer ${auth.APIToken}`
        },
      })
      setFolder(
        res.data.folders.map((d) => ({

          ...d,
          label: d.foldername,
          value: d.foldername

        }))
      )

    } catch (err) {
      const messages = err.response.data.messages
      toast.err(messages);
    }
  }

  
  const handleSubmit = () => {
    addAssigned()
  }

  const handleFetch = (e) => {
    let result = e.map((data, index) => {
      return data._id
    })

    setSelectedValueedit(result)
  }


  useEffect(() => {
    fetchuser();
    fetchfolder();
  }, [])

  return (
    <Box sx={userStyle.container}>
      <Headtitle title={'Share List'} />
      {/* header text */}
      <Typography sx={userStyle.HeaderText}>Share<Typography sx={userStyle.SubHeaderText} component="span">Manage your folder</Typography></Typography>
      {/* content start */}
      <br /><br />
      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
        <InputLabel htmlFor="component-outlined">Select user <b style={{color:'red'}}>*</b></InputLabel>
          <FormControl fullWidth >
            <Selects
              options={user}
              isClearable
              onChange={(e) => { setAssigned({ ...assigned, username: e.value, useruniqid: e.userid }) }}
            />
          </FormControl>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
        <InputLabel htmlFor="component-outlined">Select folder <b style={{color:'red'}}>*</b></InputLabel>
          <FormControl fullWidth>
            <Selects
              isMulti
              options={folder}
              onChange={(e) => handleFetch(e)}
            />
          </FormControl>
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={12}>
          <Button sx={userStyle.buttonshare} onClick={handleOpen} >SHARE</Button>
        </Grid>
        {/* <Grid item md={2}>
        </Grid> */}
      </Grid>

    {/* Error alert popup */}
      <Box>
            <Dialog
                open={isErrorOpen}
                onClose={handleErrorClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} />
                    <Typography variant="h6" >{showAlert}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleErrorClose} >ok</Button>
                </DialogActions>
            </Dialog>
        </Box>

      {/* share alert pop up */}
      <Dialog
        open={isDeleteOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
          <CheckCircleOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} />
          <Typography variant="h5" sx={{ color: 'red', textAlign: 'center' }}>Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button autoFocus variant="contained" color='error' onClick={() => { handleSubmit() }}> OK </Button>
        </DialogActions>
      </Dialog>
      <br /><br /><br /><br /><br /><br />
      
    </Box>
  );
}
function AssignedPasswordlist() {
  return (
    <>
      <Navbar />
      <Box sx={{ borderRadius: "20px", overflowY: 'hidden !impartant', }}>
        <Box component="main" sx={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: "30px", paddingBottom: "30px",'@media (max-width: 600px)': { paddingLeft: '30px', paddingRight: '30px' } }}><br />
          <AssignedPassword /><br /><br /><br />
        </Box>
      </Box>
      <Footer /><br /><br />
    </>
  )
}
export default AssignedPasswordlist;