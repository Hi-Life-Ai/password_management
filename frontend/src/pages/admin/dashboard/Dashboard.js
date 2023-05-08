import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { dashboardstyle } from '../../Pagestyle';
import Navbar from '../navbar/Navbar';
import Headtitle from "../navbar/Headtitle";
import axios from 'axios';
import { SERVICE } from '../../../services/Baseservice';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/Appcontext';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import KeyIcon from '@mui/icons-material/Key';
import FolderIcon from '@mui/icons-material/Folder';

const Admindashboardlist = () => {

  const { auth } = useContext(AuthContext);

  const [password, setPassword] = useState()
  const [folders, setFolders] = useState()
  const [users, setUsers] = useState()
  const [role, setRole] = useState()

  //  Fetch Password Data
  const fetchPasswords = async () => {
    try {
      let res = await axios.get(`${SERVICE.PASSWORD}`,{
          headers: {
            'Authorization': `Bearer ${auth.APIToken}`
          }
        });
      setPassword(res.data.passwords.length)
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages)
    }
  }

  //  Fetch Folders Data
  const fetchFolders = async () => {
    try {
      let res = await axios.get(`${SERVICE.FOLDER}`,{
          headers: {
            'Authorization': `Bearer ${auth.APIToken}`
          }
        });
      setFolders(res.data.folders.length)
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages)
    }
  }

  //  Fetch Users Data
  const fetchUsers = async () => {
    try {
      let res = await axios.get(`${SERVICE.USERS}`,{
          headers: {
            'Authorization': `Bearer ${auth.APIToken}`
          }
        });
      setUsers(res.data.users.length)
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages)
    }
  }

  //  Fetch Users Data
  const fetchRole = async () => {
    try {
      let res = await axios.get(`${SERVICE.DESIGNATIONS}`,{
          headers: {
            'Authorization': `Bearer ${auth.APIToken}`
          }
        });
      setRole(res.data.designations.length)
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages)
    }
  }

  useEffect(() => {
    fetchRole();
    fetchUsers();
    fetchFolders();
    fetchPasswords();
  }, [])

  return (
    <Box>
      <Headtitle title={'Dashboard'} />
      <Typography sx={{ color: '#1976d2', fontSize: "25px", '@media (max-width: 780px)': { fontSize: '20px', color: '#002e5c' } }}>
        Password Management System Admin</Typography><br /><br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3} >
          <Grid sx={dashboardstyle.container}>
            <Link to="/admin/password/list" style={dashboardstyle.link}> 
              <Grid sx={dashboardstyle.contentbox}>
                <Grid sx={dashboardstyle.contentboxicon}><KeyIcon sx={dashboardstyle.icon} /></Grid>
                <span>TOTAL PASSWORDS<br /><span style={{ fontSize: '20px' }}>{password}</span></span>
              </Grid>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} >
          <Grid sx={dashboardstyle.container}>
            <Link to="/admin/folder/list" style={dashboardstyle.link}> 
              <Grid sx={dashboardstyle.contentbox}>
                <Grid sx={dashboardstyle.contentboxicon}><FolderIcon sx={dashboardstyle.icon} /></Grid>
                <span>TOTAL FOLDERS<br /><span style={{ fontSize: '20px' }}>{folders}</span></span>
              </Grid>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} >
          <Grid sx={dashboardstyle.container}>
            <Link to="/admin/user/list" style={dashboardstyle.link}> 
              <Grid sx={dashboardstyle.contentbox}>
                <Grid sx={dashboardstyle.contentboxicon}><GroupAddIcon sx={dashboardstyle.icon} /></Grid>
                <span>TOTAL USERS<br /><span style={{ fontSize: '20px' }}>{users}</span></span>
              </Grid>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} >
          <Grid sx={dashboardstyle.containerOne}>
            <Grid sx={dashboardstyle.contentbox}>
              <Grid sx={dashboardstyle.contentboxicon}><PersonIcon sx={dashboardstyle.icon} /></Grid>
              <span>TOTAL ROLES<br /><span style={{ fontSize: '20px' }}>{role}</span></span>
            </Grid>
          </Grid>
        </Grid>
      </Grid><br /><br />
    </Box>
  );
}

const Dashboard = () => {
  return (
    <>
    <Navbar />
      <Box sx={{ borderRadius: "20px", overflowY: 'hidden !impartant', }}>
        <Box component="main" sx={{ padding: '30px', }}><br />
          <Admindashboardlist />
        </Box>
      </Box>
    </>
  )
}

export default Dashboard;