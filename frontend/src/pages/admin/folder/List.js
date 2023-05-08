import React, { useState, useEffect,  useRef, useContext } from 'react';
import { Box, Table, TableBody, TableContainer, DialogTitle,DialogContentText, TableHead,OutlinedInput, Paper,FormControl,InputLabel,Select,MenuItem, Button, Grid, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';
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
import Createfolder from "./Create";
import { SERVICE } from "../../../services/Baseservice"
import axios from "axios";
import { toast } from "react-toastify";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Selects from "react-select";
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from '../../../context/Appcontext';
import { Link } from 'react-router-dom';

function Passwordfolderlist() {

  const { auth } = useContext(AuthContext);

  const [exceldata, setExceldata] = useState([]);
  const [folder, setFolder] = useState([]);
  const [isFolder, setIsFolder] = useState({foldername:""})
  const [list , setList]=useState({status:""})
  const [fetchFolderName, setFetchFolderName] = useState("")
  const [pwdName, setPwdName] = useState([])
  const [selectedValueedit, setSelectedValueedit] = useState([]);
  const [selectedValuePass, setSelectedValuePass] = useState([]);  
  const [selectedunits, setselectedunits] = useState([]);

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [showAlert, setShowAlert] = useState()
  const handleOpen = () => { setIsErrorOpen(true); };
  const handleCloseError = () => { setIsErrorOpen(false); };
  
  //  Error popup
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleClickOpen = () => { setIsDeleteOpen(true) };
  const handleClose = () => { setIsDeleteOpen(false) };

  //  add passwords into folder popup
  const [isOpen , setIsOpen]=useState(false)
  const handlePopupOpen = () => { setIsOpen(true) };
  const handlePopupClose = () => { setIsOpen(false) };

  //  edit passwords into folder popup
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const handlePopupOpenEdit = () => { setIsOpenEdit(true) };
  const handlePopupCloseEdit = () => { setIsOpenEdit(false) };

  // Data Table
  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");


  //  Fetch Folder Data
  const fetchFolder = async () => {
    try {
      let res = await axios.get(SERVICE.FOLDER, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        }
      });  
      setFolder(res.data.folders)     
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages)
    }
  }

  //  Fetch Passwords Data
  const fetchPasswordsName = async () => {
    try {
      let res = await axios.get(SERVICE.PASSWORD, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        }
      });  
      setPwdName(res?.data?.passwords?.map((d) => ({
        ...d,
        label:d.name,
        value:d.name,
      })))
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages)
    }
  }

  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.FOLDER_SINGLE}/${id}`, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        }
      })
      setIsFolder(res.data.sfolder);//set function to get particular row
    
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages);
    }
  }


  //alert delete popup
  let folderid = isFolder._id;

  const deleteFolder = async (folderid) => {
    try {
       await axios.delete(`${SERVICE.FOLDER_SINGLE}/${folderid}`, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        }
      })
      handleClose();
    } catch (err) {
      const messages = err.response.data.message;
      toast.error(messages);
    }
  };

  const handleChangeedit = (e) => {
    setSelectedValueedit(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const addFolderData = async (folderid) => {
    try {
       await axios.put(`${SERVICE.FOLDER_SINGLE}/${folderid}`, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        },
       passwordnames:[...selectedValueedit]
      })
    } catch (err) {
      const messages = err.response.data.message;
      toast.err(messages);
    }
  };


  const getunitvalues = (e) => {
    setselectedunits(
      Array.isArray(e?.passwordnames)
        ? e?.passwordnames?.map((x) => ({
            ...x,
            label: x,
            value: x,
          }))
        : []
    );
  };

  const handlePassChange = (e) => {
    setSelectedValuePass(Array.isArray(e) ? e?.map((x) => x.value) : []);
  };
  const EditFolderData = async (folderid) => {
    try {
      let res = await axios.put(`${SERVICE.FOLDER_SINGLE}/${folderid}`, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        },
       foldername:String(isFolder.foldername),
       passwordnames:[...selectedValuePass == "" ? selectedunits  :selectedValuePass ]
      })
      setIsFolder(res.data)
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER
    });  
    } catch (err) {
      const messages = err.response.data.message;
      toast.err(messages);
    }
  };


  const handleActivatetrue = async (id) => {
    if(list.status == "Activate"){
      setShowAlert("Already activated")
      handleOpen()
    }
    try {
    let res =   await axios.put(`${SERVICE.FOLDER_SINGLE}/${id}`, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        },
        status :"activate"
      })
      setIsFolder(res.data)  
    } catch (err) {
      const messages = err.response.data.message;
      toast.err(messages);
    }
  };

  const handleActivatefalse = async (id) => {
    if(list.status == "Deactivate"){
      setShowAlert("Already Deactivated")
      handleOpen()
    }

    try {
      let res = await axios.put(`${SERVICE.FOLDER_SINGLE}/${id}`, {
        headers: {
          'Authorization': `Bearer ${auth.APIToken}`
        },
        status :"Deactivate"  
      })
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER
    });
    } catch (err) {
      const messages = err.response.data.message;
      toast.err(messages);
    }
  };

  // Excel
  const fileName = 'Folders List'
  // get particular columns for export excel
  const getexcelDatas = async () => {
    let xldata = await axios.get(SERVICE.FOLDER)
    let dataxl = xldata.data.folders.map((data)=>{
    delete data.createdAt
    delete data.__v
    delete data._id
    delete data.passwordnames
    return data
    })
    setExceldata(dataxl);
  }

  useEffect(()=>{
   getexcelDatas()
  },[exceldata])

  // Print
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'FOLDERS LIST',
    pageStyle: 'print'
  });

  //  PDF
  const downloadPdf = () => {
    const doc = new jsPDF()
    autoTable(doc, { html: '#folderslist' })
    doc.save('Folders List.pdf')
  }

  // datatable ....search bar
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = folder?.filter((item) =>
      Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const selectPageHandler = (selPage) => {
    if (selPage >= 1 && selPage <= (Math.ceil(folder.length / (Number(entries)))) && selPage !== pages)
      setPages(selPage)
  };
  let folderLength = folder.length;

  useEffect(
    () => {
      selectPageHandler();
    }
  );

  useEffect(() => {
    fetchFolder();
    fetchPasswordsName();
  }, [fetchFolderName, folder])
  
  return (
      
    <Box>
      <Headtitle title={'Folder List'} />
      {/* header text */}
      <Typography sx={userStyle.HeaderText}>Folders<Typography sx={userStyle.SubHeaderText} component="span" >Manage your folders</Typography></Typography>
      {/* content start */}
      <Box sx={userStyle.container}>
        <Grid container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Createfolder setFetchFolderName={setFetchFolderName} />
          </Grid>
        </Grid>
        <Grid container sx={userStyle.gridcontainer}>
          <Grid >
            <ExportCSV csvData={exceldata} fileName={fileName} />
            <ExportXL csvData={exceldata} fileName={fileName} />
            <Button sx={userStyle.buttongrp} onClick={handleprint}>&ensp;<FaPrint />&ensp;Print&ensp;</Button>
            <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
          </Grid>
        </Grid><br />
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
                            <MenuItem value={(folder.length)}>All</MenuItem>
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
                            <StyledTableCell>Folder Name</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                          </StyledTableRow>
                      </TableHead>
                      <TableBody align="left">
                        {filteredData.length > 0 ?
                          (filteredData.slice((pages * entries - entries < folderLength ? pages * entries - entries : 0),
                            ((pages * entries - entries <= folderLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>
                          <Grid sx={{ display: 'flex' }}>
                              {row.status == "Deactivate" ?  null :  <Button   onClick={()=>{handlePopupOpenEdit();  rowData(row._id);getunitvalues(row)}}  sx={userStyle.buttonedit}><EditOutlinedIcon style={{ fontSize: "small" }} /></Button>}
                              <Link to={`/admin/folder/view/${row._id}`}><Button sx={userStyle.buttonview} style={{ minWidth: '0px' }}><VisibilityOutlinedIcon style={{ fontSize: 'small' }} /></Button></Link>
                              <Button sx={userStyle.buttondelete} onClick={(e) => { handleClickOpen(); rowData(row._id) }} ><DeleteOutlineOutlinedIcon style={{ fontSize: 'small' }} /></Button>
                              {row.status == "Deactivate" ?  null : <Button onClick={()=>{handlePopupOpen();  rowData(row._id)}}  sx={userStyle.btnaddpwd}><AddIcon style={{ fontSize: 'small' }}/></Button>}
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell>{row.foldername}</StyledTableCell>
                          <StyledTableCell>
                            <FormControl variant="outlined" fullWidth>
                              <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                              <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Status"
                                defaultValue={row.status == "Deactivate" ? "Deactivate" : "Activate"}
                                onChange={(e) => { setList({ ...list, status: e.target.value });}}
                              >
                                <MenuItem value="Activate" onClick={(e) => {  handleActivatetrue(row._id)}}  >Activate</MenuItem>
                                <MenuItem value="Deactivate" onClick={(e) =>{ handleActivatefalse(row._id)}}>Deactivate</MenuItem>
                              </Select>
                            </FormControl>
                          </StyledTableCell>
                                </StyledTableRow>
                                )))
                                : <StyledTableRow><StyledTableCell colSpan={3} sx={{ textAlign: "center" }}>No data Available</StyledTableCell></StyledTableRow>
                              }
                      </TableBody>
                    </Table>
                </TableContainer>
                <Grid sx={userStyle.dataTablestyle}>
                    <Typography>Showing
                    {(pages * entries - entries <= folderLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
                    {/* {(pages * entries - entries + 1)}  */}
                    to {(pages * entries) > folder.length ? folder.length : ((pages * entries))} of {folder.length} entries</Typography>
                    {folder && <Typography className="Pagination">
                    <Button onClick={() => { selectPageHandler(pages - 1) }} sx={userStyle.btnPagination}>prev</Button>

                    {[...Array(Math.ceil(folder.length / Number(entries)))].map((_, i) => {
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
      </Box>
      {/* print layout */}
      <Box sx={userStyle.printcls} >
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 700 }} aria-label="customized table" id="folderslist" ref={componentRef}>
            <TableHead sx={{ fontWeight: "600", fontSize: "14px" }} >
              <StyledTableRow>
                <StyledTableCell>Folder Name</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody align="left">
              {folder.length > 0 && 
                (folder?.map((row,index) => (
                  <StyledTableRow key={index} >
                    <StyledTableCell>{row.foldername}</StyledTableCell>
                    <StyledTableCell>{row.status} </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* Add passwords into folder popup */}
      <Box>
        <Dialog open={isOpen}  minWidth="lg" PaperProps={{ style: { overflowY: 'visible' }}}>
          <DialogTitle sx={{backgroundColor: '#e0e0e0',color:"#000", display:"flex"}}>
            <AddIcon/>&nbsp;
            <Typography sx={{marginTop:"1px", fontWeight:700}}>Add Password(s) to Folder</Typography>
          </DialogTitle>
          <DialogContent sx={{ padding: '20px',overflowY: 'visible'}}>
            {/* <Box> */}
            <DialogContentText id="alert-dialog-description">
              <Grid container spacing={3} sx={{ marginTop: '2px' }}>
                  <Grid item md={12} lg={12}>
                      <Typography>Folder Name <b style={{ color: "red" }}>*</b></Typography>
                      <FormControl size="small" fullWidth>
                          <OutlinedInput
                              sx={userStyle.input}
                              id="component-outlined"
                              type="text"
                              value={isFolder.foldername}
                          />
                      </FormControl>
                  </Grid><br /><br />
                  <Grid item md={12} lg={12}>
                      <FormControl fullWidth>
                      <Typography>Password</Typography>
                      <Selects
                        isMulti
                        name="units"
                        options={pwdName}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleChangeedit}
                      />
                    </FormControl>
                  </Grid>
              </Grid>
            {/* </Box> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button  onClick={handlePopupClose} variant="outlined" sx={userStyle.buttoncancel}>Cancel</Button>
            <Button  onClick={()=>{addFolderData(isFolder._id);handlePopupClose()}}  autoFocus variant="contained" color='error' sx={userStyle.buttonadd}> OK </Button>
          </DialogActions>
        </Dialog>
      </Box>
              
      {/* Edit Passwords into folder popup */}
      <Dialog open={isOpenEdit}  minWidth="lg" PaperProps={{ style: { overflowY: 'visible' }}}>
        <DialogTitle sx={{backgroundColor: '#e0e0e0',color:"#000", display:"flex"}}>
          <EditOutlinedIcon/>&nbsp;
          <Typography sx={{marginTop:"1px", fontWeight:700}}>Edit Password(s) to Folder</Typography>
        </DialogTitle>
        <DialogContent sx={{ padding: '20px',overflowY: 'visible' }}>
          <Box>
            <Grid container spacing={3} sx={{ marginTop: '2px' }}>
                <Grid item md={12} lg={12}>
                    <Typography>Folder Name <b style={{ color: "red" }}>*</b></Typography>
                    <FormControl size="small" fullWidth>
                        <OutlinedInput
                            sx={userStyle.input}
                            id="component-outlined"
                            type="text"
                            value={isFolder.foldername}  
                            onChange={(e) => { setIsFolder({ ...isFolder, foldername: e.target.value });}}                                            
                        />
                    </FormControl>
                </Grid><br /><br />
                <Grid item md={12} lg={12}>
                    <FormControl fullWidth>
                    <Typography>Password</Typography>
                    <Selects
                      isMulti
                      name="password"
                      options={pwdName}
                      defaultValue={selectedunits}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={handlePassChange}
                    />
                  </FormControl>
                </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handlePopupCloseEdit} variant="outlined" sx={userStyle.buttoncancel}>Cancel</Button>
          <Button  onClick={()=>{EditFolderData(isFolder._id);handlePopupCloseEdit()}}  autoFocus variant="contained" color='error' sx={userStyle.buttonadd}> OK </Button>
        </DialogActions>
      </Dialog>

      {/* ALERT DIALOG */}
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
              <Button variant="contained" color="error" onClick={handleCloseError} >ok</Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* DELETE DIALOG */}
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
          <Button onClick={(e) => deleteFolder(folderid)} autoFocus variant="contained" color='error'> OK </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function Passwordfolder() {
  return(
    <>
      <Box>
        <Navbar />
        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
          <Box component="main" sx={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: "30px", paddingBottom: "30px" }}><br /><br />
            <Passwordfolderlist /><br /><br /><br />
          </Box>
          <Footer /><br /><br />
        </Box>
      </Box>
    </>
  )
}
  
export default Passwordfolder;