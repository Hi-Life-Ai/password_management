import React, { useState, useEffect, useRef, useContext } from 'react';
import { Box, Table,FormControl,Select,MenuItem, OutlinedInput,TableBody, TableContainer, TableHead, Paper, Button, Grid, Typography, Dialog, DialogContent, DialogActions, TextField } from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../../Table';
import Footer from '../navbar/Footer';
import Navbar from '../navbar/Navbar';
import Headtitle from '../navbar/Headtitle';
import { FaPrint, FaFilePdf, } from 'react-icons/fa';
import { ExportXL, ExportCSV } from '../../Export';
import { userStyle } from '../../Pagestyle';
import { useReactToPrint } from "react-to-print";
import autoTable from 'jspdf-autotable';
import jsPDF from "jspdf";
import { Link, } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { toast } from 'react-toastify';
import axios from 'axios';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { SERVICE } from '../../../services/Baseservice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { AuthContext } from '../../../context/Appcontext';

function Passwordlists() {

  //  Access
  const { auth } = useContext(AuthContext);

  const [password, setPassword] = useState([]);
  const [exceldata, setExceldata] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleClickOpen = () => { setIsDeleteOpen(true) };
  const handleClose = () => { setIsDeleteOpen(false) };
  const [iscustomer, setIsCustomer] = useState({});
  const [ispassword, setIspassword] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Data Table
  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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

      setPassword(res.data.passwords)
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages)
    }
  }

  useEffect(() => {
    fetchPasswords();
  }, [])


  const togglePasswordVisibility = (i) => {
    setIspassword(prevState => ({
      ...prevState,
      [i]: !prevState[i]
    }));
  };

  const copyToClipboard = (password,i) => {
    navigator.clipboard.writeText(password);
    setCopySuccess(prevState => ({
      ...prevState,
      [i]: !prevState[i]
    }));

  };

  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.PASSWORD_SINGLE}/${id}`, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        }
      })
      setIsCustomer(res.data.spassword);//set function to get particular row
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages);
    }
  }

  //alert delete popup
  let cusid = iscustomer._id;

  const deleteData = async (cusid) => {
    try {
       await axios.delete(`${SERVICE.PASSWORD_SINGLE}/${cusid}`, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        }
      })
      fetchPasswords();
      handleClose();
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages);
    }
  };
  // Excel
  const fileName = 'Passwords List'
  // get particular columns for export excel

  const getexcelDatas = async () => {
    var data = password?.map(t => ({
      'Name': t.name,
      'UserName': t.username,
      'Password': t.password,
      'TOTP Key': t.totpkey,
      'Current TOTP Key': t.curtotpkey,
      'Url': t.url,
    }));
    setExceldata(data);
  }

  useEffect(() => {
    getexcelDatas();
  }, [password])

  //  Print
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'PASSWORDS LIST',
    pageStyle: 'print'
  });

  //  PDF
  const downloadPdf = () => {
    const doc = new jsPDF()
    autoTable(doc, { html: '#passwordtable' })
    doc.save('Passwords List.pdf')
  }

  // datatable ....search bar
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = password?.filter((item) =>
      Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const selectPageHandler = (selPage) => {
    if (selPage >= 1 && selPage <= (Math.ceil(password.length / (Number(entries)))) && selPage !== pages)
      setPages(selPage)
  };
  let passwordLength = password.length;

  useEffect(
    () => {
      selectPageHandler();
    }
  );

  return (
    <Box>
      <Headtitle title={'Passwords List'} />
      {/* header text */}
      <Typography sx={userStyle.HeaderText}>Passwords<Typography sx={userStyle.SubHeaderText} component="span">Manage your passwords</Typography></Typography>
      {/* content start */}
      <Box sx={userStyle.container}>
        <Grid container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Link to="/admin/password/create" style={{ textDecoration: 'none', color: 'white' }}><Button sx={userStyle.buttonadd}>ADD</Button></Link>
          </Grid>
        </Grid>
        <Grid container sx={userStyle.gridcontainer}>
          <Grid >
            <ExportCSV fileName={fileName} csvData={exceldata} />
            <ExportXL fileName={fileName} csvData={exceldata} />
            <Button sx={userStyle.buttongrp} onClick={handleprint} >&ensp;<FaPrint />&ensp;Print&ensp;</Button>
            <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()} ><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
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
                            <MenuItem value={(password.length)}>All</MenuItem>
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
                          <StyledTableCell>Actions</StyledTableCell>
                          <StyledTableCell>Logo</StyledTableCell>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>User Name</StyledTableCell>
                          <StyledTableCell>Password</StyledTableCell>
                          <StyledTableCell>TOTP Key</StyledTableCell>
                          <StyledTableCell>Current TOTP Key</StyledTableCell>
                          <StyledTableCell>Url</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody align="left">
                    {filteredData.length > 0 ?
                  (filteredData.slice((pages * entries - entries < passwordLength ? pages * entries - entries : 0),
                    ((pages * entries - entries <= passwordLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (

                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                  <Grid sx={{ display: 'flex' }}>
                                    <Link to={`/admin/password/edit/${row._id}`} style={{ textDecoration: 'none', color: '#fff' }}><Button sx={userStyle.buttonedit}><EditOutlinedIcon style={{ fontSize: "small" }} /></Button></Link>
                                    <Link to={`/admin/password/view/${row._id}`} style={{ textDecoration: 'none', color: '#fff', minWidth: '0px' }}><Button sx={userStyle.buttonview} style={{ minWidth: '0px' }}><VisibilityOutlinedIcon style={{ fontSize: 'small' }} /></Button></Link>
                                    <Button sx={userStyle.buttondelete} onClick={(e) => { handleClickOpen(); rowData(row._id) }} ><DeleteOutlineOutlinedIcon style={{ fontSize: 'small' }} /></Button>
                                  </Grid>
                                </StyledTableCell>
                                <StyledTableCell ><img src={row.logo} style={{ width: '50px', height: '50px' }} /></StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.username}</StyledTableCell>
                                <StyledTableCell ><TextField value={row.password}
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '& fieldset': {
                                        border: 'none',
                                      },
                                    },
                                  }}
                                  type={ispassword[index] ? "text" : "password"}>
                                </TextField>
                                  <Grid sx={{ display: "flex", justifyContent: "center" }} >
                                    {copySuccess[index] ?
                                      <LibraryAddCheckIcon fontSize="small" sx={{ cursor: "pointer" }}  onClick={() => copyToClipboard(row.password)}  />
                                      : <ContentCopyIcon fontSize="small" sx={{ cursor: "pointer" }} onClick={() => copyToClipboard(row.password,index)} />
                                    } &ensp;
                                    {ispassword[index] ?
                                      <VisibilityOffIcon fontSize="small" sx={{ cursor: "pointer", }} onClick={() => { togglePasswordVisibility(index) }} />
                                      : <VisibilityIcon fontSize="small" sx={{ cursor: "pointer", }} onClick={() => { togglePasswordVisibility(index) }} />
                                    }
                                  </Grid>
                                </StyledTableCell>
                                <StyledTableCell>{row.totpkey}</StyledTableCell>
                                <StyledTableCell>{row.curtotpkey}</StyledTableCell>
                                <StyledTableCell>{row.url}</StyledTableCell>
                            </StyledTableRow>
                          )))
                          : <StyledTableRow><StyledTableCell colSpan={8} sx={{ textAlign: "center" }}>No data Available</StyledTableCell></StyledTableRow>
                        }
                    </TableBody>
                    </Table>
                </TableContainer>
                <Grid sx={userStyle.dataTablestyle}>
                    <Typography>Showing
                    {(pages * entries - entries <= passwordLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                    {/* {(pages * entries - entries + 1)}  */}
                    to {(pages * entries) > password.length ? password.length : ((pages * entries))} of {password.length} entries</Typography>
                    {password && <Typography className="Pagination">
                    <Button onClick={() => { selectPageHandler(pages - 1) }} sx={userStyle.btnPagination}>prev</Button>

                    {[...Array(Math.ceil(password.length / Number(entries)))].map((_, i) => {
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
          {/* Table End */}

          {/* PRINT START */}
          <Box sx={userStyle.printcls}>
            <>
              <Box>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table" id="passwordtable" ref={componentRef}>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>User Name</StyledTableCell>
                        <StyledTableCell>Password</StyledTableCell>
                        <StyledTableCell>TOTP Key</StyledTableCell>
                        <StyledTableCell>Current TOTP Key</StyledTableCell>
                        <StyledTableCell>Url</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody align="left">
                      {password && (
                        password.map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell>{row.name}</StyledTableCell>
                            <StyledTableCell>{row.username}</StyledTableCell>
                            <StyledTableCell>{row.password}</StyledTableCell>
                            <StyledTableCell>{row.totpkey}</StyledTableCell>
                            <StyledTableCell>{row.curtotpkey}</StyledTableCell>
                            <StyledTableCell>{row.url}</StyledTableCell>
                          </StyledTableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          </Box>
          {/* Table End */}
        </Box>
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
          <Button onClick={(e) => deleteData(cusid)} autoFocus variant="contained" color='error'> OK </Button>
        </DialogActions>
      </Dialog>
      { /* Table End */}
    </Box>
  );
}

function Passwordlist() {
  return (
    <Box>
      <Navbar />
      <Box sx={{ width: '100%', overflowX: 'hidden', }}>
        <Box component="main" sx={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: "30px", paddingBottom: "30px" }}><br /><br />
          <Passwordlists /><br /><br /><br />
        </Box>
        <Footer /><br /><br />
      </Box>
    </Box>
  );
}

export default Passwordlist;
