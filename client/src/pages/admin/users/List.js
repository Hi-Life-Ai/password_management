import React, { useContext, useState, useEffect, useRef } from 'react';
import { Box,OutlinedInput,FormControl,Select,MenuItem, Table, TableBody, Dialog, DialogContent, DialogActions, TableContainer,TableCell, TableRow, TableHead, Paper, Button, Grid, Typography, } from '@mui/material';
import { userStyle } from '../../Pagestyle';
import { ExportXL, ExportCSV } from '../../Export';
import { StyledTableRow, StyledTableCell } from '../../Table';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Headtitle from '../navbar/Headtitle';
import Footer from '../navbar/Footer';
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SERVICE } from '../../../services/Baseservice';
import { FaPrint, FaFilePdf } from 'react-icons/fa';
import { AuthContext } from '../../../context/Appcontext';
import { useReactToPrint } from "react-to-print";
import autoTable from 'jspdf-autotable';
import jsPDF from "jspdf";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function Adminuserlist() {

  const { auth } = useContext(AuthContext);

  const [users, setusers] = useState([]);
  const [exceldata, setExceldata] = useState([]);
  const [isUser, setIsUser] = useState({});

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleClickOpen = () => { setIsDeleteOpen(true); };
  const handleClose = () => { setIsDeleteOpen(false); };

  // Data Table
  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch user
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

  // delete
  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.USER_SINGLE}/${id}`, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        }
      })
      setIsUser(res.data.suser);//set function to get particular row
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages);
    }
  }

  //alert delete popup
  let useridid = isUser._id;

  const deleteUser = async (useridid) => {
    try {
      let res = await axios.delete(`${SERVICE.USER_SINGLE}/${useridid}`, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        }
      })
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER
    });
      fetchAllUser();
      handleClose();
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages);
    }
  };

  useEffect(
    () => {
      fetchAllUser();
    }, []
  )

  // Excel
  const fileName = 'User List'
  // get particular columns for export excel
   const getexcelDatas = async () => {
    var data = users?.map(t => ({
      'User Id': t.userid,
      'User Name': t.username,
      'Email Id': t.emailid,
      'Role': t.designation,
      'Mobile': t.mobilenumber,
      'Other Contact Number': t.othermobilenumber,
      'Remarks': t.remarks,
    }));
    setExceldata(data);
  }

  // Print
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'USER LIST',
    pageStyle: 'print'
  });

  //  PDF
  const downloadPdf = () => {
    const doc = new jsPDF()
    autoTable(doc, { html: '#userlist' })
    doc.save('Userlist.pdf')
  }

  // datatable ....search bar
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = users?.filter((item) =>
      Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const selectPageHandler = (selPage) => {
    if (selPage >= 1 && selPage <= (Math.ceil(users.length / (Number(entries)))) && selPage !== pages)
      setPages(selPage)
  };
  let usersLength = users.length;

  useEffect(
    () => {
      selectPageHandler();
    }
  );

  useEffect(
    () => {
      getexcelDatas();
    }, [users])

  return (
    <Box>
      <Headtitle title={'User List'} />
      <Typography sx={userStyle.HeaderText}>User List</Typography>
      {/* content start */}
      <Box sx={userStyle.container}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography sx={userStyle.importheadtext}>All Users</Typography>
          </Grid>
          <Grid item xs={4}>
            <Link to="/admin/user/create" style={{ textDecoration: 'none', color: 'white' }}><Button sx={userStyle.buttonadd}>ADD</Button></Link>
          </Grid>
        </Grid>
        { /* ******************************************************EXPORT Buttons****************************************************** */}
        <Grid container sx={userStyle.gridcontainer}>
          <Grid >
              <ExportCSV csvData={exceldata} fileName={fileName} />
              <ExportXL csvData={exceldata} fileName={fileName} />
              <Button sx={userStyle.buttongrp} onClick={handleprint}>&ensp;<FaPrint />&ensp;Print&ensp;</Button>
              <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
          </Grid>
        </Grid><br />
        <Box>
                <Grid container spacing={2} sx={userStyle.dataTablestyle}>
                    <Grid item md={1.5} sm={12} xs={12}>
                      <FormControl size="small" fullWidth>
                          <Typography>Show Entries</Typography>
                          <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={entries}
                          onChange={(e) => {
                              setEntries(e.target.value);
                          }}
                          >
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={10}>10</MenuItem>
                              <MenuItem value={(users.length)}>All</MenuItem>
                          </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={7.5} sm={12} xs={12}></Grid>
                    <Grid item md={3} sm={12} xs={12}>
                    <FormControl fullWidth size="small" >
                        <Typography>Search</Typography>
                        <OutlinedInput
                        id="component-outlined"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        />
                    </FormControl>
                    </Grid>
                </Grid>
                <br/><br/>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" >
                      <TableHead sx={{ fontWeight: "600" }}>
                          <StyledTableRow>
                            <StyledTableCell>Action</StyledTableCell>
                            <StyledTableCell>User ID</StyledTableCell>
                            <StyledTableCell>User name</StyledTableCell>
                            <StyledTableCell>Role</StyledTableCell>
                            <StyledTableCell>Mobile</StyledTableCell>
                          </StyledTableRow>
                      </TableHead>
                      <TableBody align="left">
                        {filteredData.length > 0 ?
                          (filteredData.slice((pages * entries - entries < usersLength ? pages * entries - entries : 0),
                            ((pages * entries - entries <= usersLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                              <StyledTableRow key={index}>
                                  <StyledTableCell >
                                    <Grid sx={{ display: 'flex' }}>
                                      <Link to={`/admin/user/edit/${row._id}`} style={{ textDecoration: 'none', color: '#fff' }}><Button sx={userStyle.buttonedit}><EditOutlinedIcon style={{ fontSize: "large" }} /></Button></Link>
                                      <Link to={`/admin/user/view/${row._id}`} style={{ textDecoration: 'none', color: '#fff', minWidth: '0px' }}><Button sx={userStyle.buttonview} style={{ fontSize: 'large'}}><VisibilityOutlinedIcon style={{ fontSize: 'large' }} /></Button></Link>
                                      <Button sx={userStyle.buttondelete} onClick={(e) => { handleClickOpen(); rowData(row._id) }} ><DeleteOutlineOutlinedIcon style={{ fontsize: 'large'}} /></Button>
                                    </Grid>
                                  </StyledTableCell>
                                  <StyledTableCell >{row.userid}</StyledTableCell>
                                  <StyledTableCell >{row.username}</StyledTableCell>
                                  <StyledTableCell >{row.designation}</StyledTableCell>
                                  <StyledTableCell >{row.mobilenumber}</StyledTableCell>
                              </StyledTableRow>
                              )))
                              : <StyledTableRow><StyledTableCell colSpan={5} sx={{ textAlign: "center" }}>No data Available</StyledTableCell></StyledTableRow>
                            }
                      </TableBody>
                    </Table>
                </TableContainer>
                <Grid sx={userStyle.dataTablestyle}>
                    <Typography>Showing
                    {(pages * entries - entries <= usersLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                    to {(pages * entries) > users.length ? users.length : ((pages * entries))} of {users.length} entries</Typography>
                    {users && <Typography className="Pagination">
                    <Button onClick={() => { selectPageHandler(pages - 1) }} sx={userStyle.btnPagination}>prev</Button>

                    {[...Array(Math.ceil(users.length / Number(entries)))].map((_, i) => {
                        if (entries == 1) {
                        if (i <= 5) {
                            return <Button onClick={() => { selectPageHandler(i + 1) }} sx={userStyle.btnPagination}>{(i + 1)}</Button>
                        }
                        }
                        else {
                          return <Button onClick={() => { selectPageHandler(i + 1) }} sx={userStyle.btnPagination}>{i + 1}</Button>
                        }
                    })}
                    <Button onClick={() => { selectPageHandler(pages + 1) }} sx={userStyle.btnPagination}>Next</Button>
                    </Typography>}
                </Grid>
        </Box>
        {/* ALERT DIALOG */}
        <Dialog
          open={isDeleteOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
            <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} />
            <Typography variant="h5" sx={{ color: 'red', textAlign: 'center' }}>Are you sure?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
            <Button onClick={(e) => deleteUser(useridid)} autoFocus variant="contained" color='error'> OK </Button>
          </DialogActions>
        </Dialog>
        { /* Table End */}
      </Box>
      {/* content end */}

      {/* Print Start*/}
      <Box sx={userStyle.printcls}>
        <>
          <Box>
            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 700, }} aria-label="customized table" id="userlist" ref={componentRef}>
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>User name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Mobile</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody align="left">
                  {users && (
                    users.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.userid}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.designation}</TableCell>
                        <TableCell>{row.mobilenumber}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      </Box>
      {/* Print End */}
    </Box>
  );
}

function Adminuser() {
  return (
    <Box>
      <Navbar />
      <Box sx={{ width: '100%', overflowX: 'hidden' }}>
        <Box component="main" sx={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: "30px", paddingBottom: "30px" }}><br /><br />
          <Adminuserlist /><br /><br /><br />
        </Box>
      </Box>
      <Footer /><br /><br />
    </Box>
  );
}

export default Adminuser;