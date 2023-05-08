import React, { useState,useContext,  useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { dashboardstyle } from '../Pagestyle';
import Navbar from './navbar/Navbar';
import Headtitle from "./navbar/Headtitle";
import KeyIcon from '@mui/icons-material/Key';
import FolderIcon from '@mui/icons-material/Folder';
import axios from 'axios';
import { SERVICE } from '../../services/Baseservice';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/Appcontext';

const Userdashboardlist = () => {

    const [password, setPassword] = useState()
    const [folders, setFolders] = useState([])
    const [folder, setFolder] = useState([]);
    const { auth } = useContext(AuthContext);  
    const[count , setcount]= useState([]);
    const [folderCount, setFolderCount] = useState([])

    let resultdata =[]
    //  Fetch Password Data
    const fetchPasswords = async () => {
        try {
            let res = await axios.get(`${SERVICE.PASSWORD}`,
                {
                  headers: {
                    'Authorization': `Bearer ${auth.APIToken}`
                  }
                }
            );
            setPassword(res.data.passwords.length)
        } catch (err) {
            const messages = err.response.data.message;
            toast.error(messages)
        }
    }

    //  Fetch Folders Data
    const fetchFolders = async () => {
        try {
            let res = await axios.get(`${SERVICE.FOLDER}`,
                {
                  headers: {
                    'Authorization': `Bearer ${auth.APIToken}`
                  }
                }
            );
            setFolders(res.data.folders.length)
        } catch (err) {
            const messages = err.response.data.message;
            toast.error(messages)
        }
    }

    const fetchAssignments = async () => {
        try {
            let res = await axios.get(SERVICE.ASSIGNPASSWORDS,{
                headers: {
                    'Authorization': `Bearer ${auth.APIToken}`
                }
            })
            res.data.assigneds.filter((data, index) => {
                if (auth.loginuseruniqid === data.useruniqid) {
                    data.userid.forEach((item, i) => {
                        resultdata.push(item)
                    })
                }
            })
            await fetchFolder();
        } catch (err) {
            const messages = err.response.data.message
            toast.error(messages);
        }
    }

    const fetchFolder = async () => {
        try {
            let res = await axios.get(SERVICE.FOLDER, {
                headers: {
                    'Authorization': `Bearer ${auth.APIToken}`
                }
            })
            let resdata = res.data.folders.filter((data) => {
                if (resultdata.includes(data._id)) {
                    return data.foldername
                }
            })
            setFolder(resdata)
        } catch (err) {
            const messsages = err.response.data.message
            toast.error(messsages);
        }
    }

    const fetchFolderPasswordCount = () => {
       let get_names =  folder.map((d)=>{
            const newarr =  d.passwordnames.flat();
            return newarr
        })
        setcount(get_names.flat());
        setFolderCount(folder.length)
    }

    useEffect(() => {
        fetchFolders();
        fetchPasswords();
        fetchAssignments()
        fetchFolderPasswordCount()
    })

    return (
        <Box>
            <Headtitle title={'Dashboard'} />
            <Typography sx={{ color: '#1976d2', fontSize: "25px", '@media (max-width: 780px)': { fontSize: '20px', color: '#002e5c' } }}>
                Password Management System User</Typography><br /><br />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                    <Grid sx={dashboardstyle.containerOne}>
                        <Grid sx={dashboardstyle.contentbox}>
                            <Grid sx={dashboardstyle.contentboxicon}><KeyIcon sx={{ fontSize: '50px', padding: '5px', marginTop: '2px', '@media (max-width: 360px)': { fontSize: '45px', } }} /></Grid>
                            <span>TOTAL PASSWORDS<br /><span style={{ fontSize: '20px' }}>{count.length}</span></span>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                    <Grid sx={dashboardstyle.containerOne}>
                        <Grid sx={dashboardstyle.contentbox}>
                            <Grid sx={dashboardstyle.contentboxicon}><FolderIcon sx={{ fontSize: '50px', padding: '5px', marginTop: '2px', '@media (max-width: 360px)': { fontSize: '40px', } }} /></Grid>
                            <span>TOTAL FOLDERS<br /><span style={{ fontSize: '20px' }}>{folderCount}</span></span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid><br /><br />
        </Box>
    );
}

const Userdashboard = () => {
    return (
        <>
        <Navbar />
            <Box sx={{ borderRadius: "20px", overflowY: 'hidden !impartant', }}>
                <Box component="main" sx={{ padding: '30px', }}><br />
                    <Userdashboardlist />
                </Box>
            </Box>
        </>
    )
}

export default Userdashboard;