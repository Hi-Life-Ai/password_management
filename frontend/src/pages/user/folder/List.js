import React, { useState, useEffect, useContext, useRef, } from 'react';
import { Box,Button,OutlinedInput,FormControl,Select, MenuItem,Table, TableBody, TableContainer, TableHead, Paper, Grid, Typography, } from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../../Table';
import Footer from '../navbar/Footer';
import { userStyle } from '../../Pagestyle';
import { toast } from "react-toastify";
import Headtitle from '../navbar/Headtitle';
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import autoTable from 'jspdf-autotable';
import jsPDF from "jspdf";
import { ExportXL, ExportCSV } from '../../Export';
import { FaPrint, FaFilePdf, } from 'react-icons/fa';
import Navbar from '../navbar/Navbar';
import { SERVICE } from '../../../services/Baseservice';
import { AuthContext } from '../../../context/Appcontext';
import { Link } from 'react-router-dom';

function Passwordlistuser() {

    const [folder, setFolder] = useState([]);
    const [exceldata, setExceldata] = useState([]);

    //  Access
    const { auth } = useContext(AuthContext);  

    let resultdata = [];

    // Data Table
    const [entries, setEntries] = useState(1);
    const [pages, setPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

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
                    return data
                }
            })
            setFolder(resdata)
        } catch (err) {
            const messsages = err.response.data.message
            toast.error(messsages);
        }
    }

    // Excel
    const fileName = 'Passwords List'
    // get particular columns for export excel

    const getexcelDatas = async () => {
        var data = folder?.map(t => ({
        'Folder': t.foldername,
        'Passwords': t.passwordnames.join(" ,")
        }));
        setExceldata(data);
    }

    useEffect(() => {
        getexcelDatas();
    }, [folder])

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
        fetchAssignments();
    }, [])

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
                    </Grid>
                </Grid>
                <Grid container sx={userStyle.gridcontainer}>
                    <Grid >
                        <ExportCSV fileName={fileName} csvData={exceldata} />
                        <ExportXL fileName={fileName} csvData={exceldata} />
                        <Button sx={userStyle.buttongrp} onClick={handleprint} >&ensp;<FaPrint />&ensp;Print&ensp;</Button>
                        <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()} ><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
                    </Grid>
                </Grid>
                <br />
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
                                <StyledTableCell>Folder</StyledTableCell>
                                <StyledTableCell>Passwords</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody align="left">
                            {filteredData.length > 0 ?
                                (filteredData.slice((pages * entries - entries < folderLength ? pages * entries - entries : 0),
                                    ((pages * entries - entries <= folderLength ? pages * entries - entries : 0) == 0 ? entries : pages * entries)).map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{row.foldername}</StyledTableCell>
                                            <StyledTableCell>{row.passwordnames.join(" ,")}</StyledTableCell>
                                        </StyledTableRow>
                                )))
                                : <StyledTableRow><StyledTableCell colSpan={2} sx={{ textAlign: "center" }}>No data Available</StyledTableCell></StyledTableRow>
                              }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid sx={userStyle.dataTablestyle}>
                    <Typography>Showing
                    {(pages * entries - entries <= folderLength ? (pages * entries - entries + 1) : 0) == 0 ? Math.floor((pages * entries - entries + 1) / (pages * entries - entries)) : (pages * entries - entries + 1)}
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
            <br /><br />
            {/* PRINT START */}
          <Box sx={userStyle.printcls}>
            <>
              <Box>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table" id="passwordtable" ref={componentRef}>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>Folder</StyledTableCell>
                        <StyledTableCell>Passwords</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody align="left">
                      {folder && (
                        folder.map((row, index) => (
                          <StyledTableRow key={index}>
                                <StyledTableCell>{row.foldername}</StyledTableCell>
                                <StyledTableCell>{row.passwordnames.join(" ,")}</StyledTableCell>
                          </StyledTableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          </Box>
        </Box>
    );
}

function Passworduser() {
    return (
        <>
            <Navbar />
            <Box sx={{ borderRadius: "20px", overflowY: 'hidden !impartant', }}>
                <Box component="main" sx={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: "30px", paddingBottom: "30px" }}>
                    <Passwordlistuser /><br /><br /><br />
                </Box>
            </Box>
            <Footer /><br /><br />
        </>
    )
}



export default Passworduser;