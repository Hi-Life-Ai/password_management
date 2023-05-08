import React, { useState, useContext } from 'react';
import { userStyle } from '../../Pagestyle';
import { Box, Grid, FormControl, InputLabel, OutlinedInput,Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SERVICE } from '../../../services/Baseservice';
import { AuthContext } from '../../../context/Appcontext';

function Createdesignationmod({setFetchsavedesignation}) {
    //  Access
    const { auth } = useContext(AuthContext);

    // Designation Modal
    const [designationmodal, setDesignationmodal] = useState(false);
    const designationModOpen = () => { setDesignationmodal(true); };
    const designationModClose = () => { setDesignationmodal(false); setDesignation({...designation, designationid:"", designationname:""}); setShowAlert("")};

    const [showAlert, setShowAlert] = useState("")

    // ******** Text field ******** //
    const [designation, setDesignation] = useState({ designationid: "", designationname: "" });

    // ******** Request to db ******** //
   // Add Datas
  const sendRequest = async () => {
    try {
      let response = await axios.post(SERVICE.DESIGNATION_CREATE, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        },
        designationid: String(designation.designationid),
        designationname: String(designation.designationname),
      });
      setFetchsavedesignation("None")
      setDesignation(response.data);
      toast.success(response.data.message,{
        position: toast.POSITION.TOP_CENTER
    });
    designationModClose();
    } catch (err) {
      const messages = err.response.data.message;
    toast.error(messages)
    }
  };

  const addDesignationSubmit = (e) => {
    e.preventDefault();
    if(designation.designationid === ""){
      setShowAlert("Please enter designation id!");
    }else if(designation.designationname === ""){
        setShowAlert("Please enter designation name!");
    }else{
      sendRequest();
    }
  };

    return (
        <Box>
            <Grid sx={userStyle.spanPlusIcons} onClick={designationModOpen}  ><AddCircleOutlineOutlinedIcon /></Grid>
            <Dialog
                onClose={designationModClose}
                aria-labelledby="customized-dialog-title1"
                open={designationmodal}
            >
                <form>
                    <DialogTitle id="customized-dialog-title1" onClose={designationModClose}> Add Designation </DialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12}>
                                <p style={{color:'red',marginBottom:"10px"}}>{showAlert}</p>
                                <FormControl size="small" fullWidth>
                                    <InputLabel htmlFor="component-outlined">Designation ID <b style={{color:'red'}}>*</b></InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={designation.designationid}
                                        onChange={(e) => { setDesignation({ ...designation, designationid: e.target.value });setShowAlert(""); }}
                                        label="Designation ID"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel htmlFor="component-outlined">Designation Name <b style={{color:'red'}}>*</b></InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={designation.designationname}
                                        onChange={(e) => { setDesignation({ ...designation, designationname: e.target.value });setShowAlert(""); }}
                                        label="Designation Name"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus variant='contained' color="success" sx={userStyle.buttonadd} onClick={addDesignationSubmit}>Save</Button>
                        <Button onClick={designationModClose} variant='contained' color="error" sx={userStyle.buttoncancel}>Close</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}

export default Createdesignationmod;