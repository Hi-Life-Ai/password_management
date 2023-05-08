export const userStyle = {
    container : {
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(97, 97, 97)',
        boxShadow: 'none',
        borderRadius: '12px',
        height: 'max-content',
        padding:'30px',
        '& .MuiTable-root':{
            borderBottom: 'none !important',
            paddingTop: '20px',
            paddingBottom: '20px',
        },
        '& .MuiTableCell-root':{
            fontSize: '18px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #B97DF0',
        },
        '& .MuiOutlinedInput-root':{
            height: '40px',
        }
    },
    dataTablestyle:{
        display:"flex",
        justifyContent:'space-between',
        '@media (max-width: 800px)' :{
            display:"block",
            textAlign:'center'
        },
    },
    btnPagination:{
        color: "rgb(97, 97, 97)"
    },
    filtercontent : {
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(97, 97, 97)',
        boxShadow: 'none',
        borderRadius: '12px',
        height: 'max-content',
        padding:'30px',
        '& .MuiTable-root':{
            borderBottom: 'none !important',
            paddingTop: '20px',
            paddingBottom: '20px',
        },
        '& .MuiTableCell-root':{
            fontSize: '18px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #B97DF0',
        },
    },
    root: {
        display: 'flex'
    },
    buttonadd: {
        backgroundColor: '#7009ab !important',
        color: 'white',
        textTransform: 'uppercase',
        marginRight: '5px !important',
        height: '40px !important',
        padding: '10px !important',
        fontWeight: '600 !important',
        borderRadius: '7px !important',
        float: 'right !important',
        border: '0px !important',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#9f3ed7 !important',
        }
    },
    buttonshare: {
        backgroundColor: '#7009ab !important',
        color: 'white',
        textTransform: 'uppercase',
        marginRight: '5px !important',
        height: '40px !important',
        padding: '10px !important',
        fontWeight: '600 !important',
        borderRadius: '7px !important',
        border: '0px !important',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#9f3ed7 !important',
        }
    },
    buttoncancel: {
        backgroundColor: '#878080 !important',
        color: 'white',
        textTransform: 'UpperCase',
        marginRight: '5px !important',
        height: '40px !important',
        padding: '10px !important',
        fontWeight: '600 !important',
        borderRadius: '7px !important',
        float: 'right !important',
        border: '0px !important',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#5a5656 !important',
        }
    },
    gridcontainer : {
        marginTop: '50px', 
        marginBottom: '20px',
        justifyContent: 'center',
    },
    buttongrp : {
        backgroundColor: 'rgb(245 243 246) !important',
        color: '#7009AB !important',
        borderColor: '#ddd !important',
        margin: '1px !important',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: '10px !important',  
    },
    HeaderText:{
        fontFamily:"'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
        fontSize: "27px",
        fontWeight: "400",
        color: 'rgb(94, 53, 177) !important',
    },
    SubHeaderText:{
        fontSize: "15px",
        display: "inline-block",
        paddingLeft: "4px",
        fontWeight: "300",
        lineHeight: "1",
        color: 'rgb(94, 53, 177) !important',
    },
    buttonedit : {
        backgroundColor: '#1572e8 !important',
        borderColor: '#1367d1 !important',
        color: '#fff !important',
        margin: '1px !important',
        marginRight: '5px !important',
        alignItems: 'center !important',
        textAlign: 'center !important',
        justifyContent: 'center !important',
        height: '30px !important',
        fontSize: '12px !important',
        fontWeight: '750 !important',
        minWidth:'0px'
    },
    buttonview : {
        background: '#11cdef !important',
        borderColor: '#0fb9d8 !important',
        color: '#fff !important',
        margin: '1px !important',
        marginRight: '5px !important',
        alignItems: 'center !important',
        textAlign: 'center !important',
        justifyContent: 'center !important',
        height: '30px !important',
        fontSize: '12px !important',
        fontWeight: '750 !important',
        minWidth: '0px'
    },
    btnaddpwd : {
        background: '#4c915e !important',
        borderColor: '#428052 !important',
        color: '#fff !important',
        margin: '1px !important',
        marginRight: '5px !important',
        alignItems: 'center !important',
        textAlign: 'center !important',
        justifyContent: 'center !important',
        height: '30px !important',
        fontSize: '12px !important',
        fontWeight: '750 !important',
        minWidth: '0px'
    },
    buttondelete : {
        background: '#f5365c !important',
        borderColor: '#f41e48 !important',
        color: '#fff !important',
        margin: '1px !important',
        marginRight: '5px !important',
        alignItems: 'center !important',
        textAlign: 'center !important',
        justifyContent: 'center !important',
        height: '30px !important',
        fontSize: '14px !important',
        fontWeight: '750 !important',
        minWidth: '0px'
    },
    spanIcons : {
        fontSize: '16px', 
        paddingTop: '5px !important', 
        paddingLeft: '6px',
        paddingRight: '1px',
        margin: 'auto', 
        border: '1px solid #b97df0', 
        width: '45px !important', 
        height: '40px', 
        borderRadius: '2px', 
        backgroundColor: 'white', 
        color: '#7009ab' ,
        cursor: 'pointer',
    },
    footerStyle:{
        fontSize:'16px !important',
        fontWeight:'600 !important',
        textAlign:'center !important'
    },

    // Import 
    importheadtext:{
        fontSize:'20px !important',
        color: 'rgb(94, 53, 177) !important',
    },
    importsubheadtext:{
        margin:'0',
    },

    //  print
    printcls:{
        display:'none',
        '@media print':{
            display:'block',
        },
    },

    // text field type = number
    input: {
        '& input[type=number]': {
            '-moz-appearance': 'textfield' //#8b5cf6
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        }
      },
      folderviewstyle: {
        marginLeft: "40px",
        letterSpacing: "1px",
        marginBottom: "10px"
    }
   
}

//  dashboard style
export const dashboardstyle = {

    container: {
        height: '155px',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        border: 'none rgba(144, 202, 249, 0.46)',
        backgroundSize: 'cover !important',
        color: "#002e5c",
        fontSize: '15px',
        borderBottomRightRadius: '30px',
        borderTopLeftRadius: '30px',
        fontWeight: '800',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset -2px 0 10px #1976d2',
        '&:hover': {
            color: "black",
            boxShadow: 'inset -2px 0 20px #002e5c',
            cursor:"pointer",
        },
        '@media (max-width: 780px)': {
            fontSize: '12px',
        }
    },
    containerOne: {
        height: '155px',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        border: 'none rgba(144, 202, 249, 0.46)',
        backgroundSize: 'cover !important',
        color: "#002e5c",
        fontSize: '15px',
        borderBottomRightRadius: '30px',
        borderTopLeftRadius: '30px',
        fontWeight: '800',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset -2px 0 10px #1976d2',
        '&:hover': {
            color: "black",
            boxShadow: 'inset -2px 0 20px #002e5c',
        },
        '@media (max-width: 780px)': {
            fontSize: '12px',
        }
    },
    contentbox: {
        height: '20%',
        margin: '15px 20px',
        justifyContent: 'space-around',
        textDecoration:"none"
    },
    contentboxicon: {
        marginTop: '2px',
        '@media (max-width: 350px)': {
            fontSize: '20px',
        }
    },
    icon:{
        fontSize: '50px', 
        padding: '5px', 
        marginTop: '2px', 
        '@media (max-width: 360px)': { fontSize: '45px', }
    },
    link:{
        textDecoration:"none", 
        color:"#002e5c"
    }
}