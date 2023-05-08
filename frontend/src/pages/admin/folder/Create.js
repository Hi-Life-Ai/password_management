import React, { useState, useContext } from 'react';
import { Box, OutlinedInput, DialogTitle, FormControl, FormControlLabel, Checkbox, Button, Grid, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';
import { userStyle } from '../../Pagestyle';
import FolderIcon from '@mui/icons-material/Folder';
import { toast } from "react-toastify";
import { SERVICE } from "../../../services/Baseservice"
import axios from "axios";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { AuthContext } from '../../../context/Appcontext';

function Passwordcreatefolder({ setFetchFolderName }) {

    const { auth } = useContext(AuthContext);

    const [folderList, setFolderList] = useState({
        foldername: "", status: ""
    });
    const [send, setSend] = useState(false);

    //Alert popup
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [showAlert, setShowAlert] = useState()
    const handleOpen = () => { setIsErrorOpen(true);; };
    const handleClose = () => { setIsErrorOpen(false);; };

    //  Add folder name popup
    const openAlert = () => {
        setSend(true)
    }
    const closeAlert = () => {
        setSend(false)
        setFolderList("")
    }

    // Folder data add to database
    const sendFolder = async () => {
        try {
            let req = await axios.post(SERVICE.FOLDER_CREATE, {
                headers: {
                    'Authorization':`Bearer ${auth.APIToken}`
                    },
                foldername: String(folderList.foldername),
                status: String(folderList.status == true ? "Activate" : "Deactivate"),
            });
            setFolderList(req.data);
            setFetchFolderName("")
            toast.success(req.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
        catch (err) {
            const messages = err.response.data.message;
            toast.err(messages)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (folderList.foldername == "") {
            setShowAlert("Please enter folder name!");
            handleOpen();
        }
        else {
            sendFolder();
            closeAlert();
        }
    }

    return (

        <Box>
            <Button sx={userStyle.buttonadd} onClick={openAlert}  >ADD</Button>
            <Dialog open={send} onClose={closeAlert}>
                <form>
                    <DialogTitle sx={{ backgroundColor: '#e0e0e0', color: "#000", display: "flex" }}>
                        <FolderIcon />&nbsp;
                        <Typography sx={{ marginTop: "1px", fontWeight: 700 }}>Create New Folder</Typography>
                    </DialogTitle>
                    <DialogContent sx={{ width: '600px', textAlign: 'center', alignItems: 'center', padding: '20px' }}>
                        <Box>
                            <Grid container spacing={3} sx={{ marginTop: '2px' }}>
                                <Grid item md={6} lg={6}>
                                    <Typography sx={{ textAlign: 'left' }} >Folder Name <b style={{ color: "red" }}>*</b></Typography>
                                    <FormControl size="small" fullWidth>
                                        <OutlinedInput
                                            sx={userStyle.input}
                                            id="component-outlined"
                                            type="text"
                                            value={folderList.foldername}
                                            onChange={(e) => setFolderList({ ...folderList, foldername: e.target.value })}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} lg={6} sx={{ marginTop: "23px" }}>
                                    <FormControlLabel control={<Checkbox checked={folderList.status} onChange={(e) => setFolderList({ ...folderList, status: !folderList.status })} />} label="Status" />
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', float: "right" }}>
                        <Button variant="contained" color="success" onClick={handleSubmit} sx={userStyle.buttonadd} >Save</Button>
                        <Button variant="contained" color="success" onClick={closeAlert} sx={userStyle.buttoncancel} >Close</Button>
                    </DialogActions>
                </form>
            </Dialog>
            {/* Alert Popup */}
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
                        <Button variant="contained" color="error" onClick={() => { handleClose(); }} >ok</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}


export default Passwordcreatefolder;