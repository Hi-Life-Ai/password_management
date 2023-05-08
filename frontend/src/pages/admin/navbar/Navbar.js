import React, { useContext } from 'react';
import { menuItems } from './MenuItemsList';
import { Grid, Button } from '@mui/material';
import MenuItems from './MenuItems';
import logo from '../../../assets/images/logo-no-bg.png';
import { AUTH } from '../../../services/Authservice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/Appcontext';

const Navbar = () => {

  const { auth, setAuth } = useContext(AuthContext);

  const backLPage = useNavigate();

  const logOut = async () => {
    try {
      let res = await axios.get(AUTH.LOGOUT, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        }
      })
      //change login state
      setAuth({ ...auth, loginState: false });
      toast.success(res.data.message);
      localStorage.clear();
      backLPage('/login');
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages);
    }
  }
  return (
    <nav style={{ display: "flex", backgroundColor: "#1976D2",paddingBottom:"10px" }}>
      <Grid container spacing={2}>
        <Grid item lg={7} md={7} sm={7} xs={12}>
          <ul className="menus" style={{ marginTop: '20px' }}>
            {menuItems.map((menu, index) => {
              const depthLevel = 0;
              return (<MenuItems items={menu} key={index} depthLevel={depthLevel} />);
            })
            } </ul>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={8} sx={{display:"flex",justifyContent:"center"}}>
          <img src={logo} alt="logo" height="55px" width="60px" className="img-resp" style={{ marginTop: '12px', }} />&emsp;
          <Link to={`/admin/profile/${auth.loginuserid}`}><Button className="glass-button" variant="contained" color="secondary" sx={{backgroundColor: "#6fa0d1 !important" }}>Profile</Button></Link>
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={4} sx={{ textAlign: "center" }}>
          <Button className="glass-button" variant="contained" color="secondary" sx={{ marginTop: "22px !important", }} onClick={logOut} >Logout</Button>
        </Grid>
      </Grid>
    </nav>

  );
};

export default Navbar;