export const loginStyle = {

    iconstyle: {
        marginLeft: "35%",
        height: "90px",
        width: "90px",
        borderRadius: "50%",
        color: '#1976d2',
        marginBottom: "50px",
        boxShadow: " inset 0 0 0 1px #1976d2",
        "@media (max-width: 780px)": {
            width: "80px",
            height: "80px",
        },
        '@media (max-width: 425px)': {
            marginBottom: "5px",
        },
        '@media (max-width: 350px)': {
            width: "70px",
            height: "70px",
            marginBottom:"30px",
           
        }
    },
    signinBtn: {
        color: 'WHITE',
        padding: '10px',
        margin: '20px 0',
        width: '100%',
        lineHeight: '20.75px',
        backgroundColor: '#1976d2 !important',
        boxShadow: '0px 5px 18px #1976d2',
        fontSize: '18px',
        cursor: 'pointer',
        textDecoration: 'none',
        marginTop: "50px",
        '& .MuiOutlinedInput-notchedOutline': {
            background: '#8080800f',
            border: '1px solid #fff'
        },
        '@media (max-width: 780px)': {
            position: 'relative',
            left: '20%',
            width: '60%',
        }
        ,
        '@media (max-width: 350px)': {
            position: 'relative',
            left: '25%',
            width: '40%',
            fontSize:"15px"
        }
    },
    loginbox: {
        color: 'rgb(97, 97, 97)',
        overflow: 'hidden',
        height: 'max-content',
        padding: '50px 5px',
        display: 'flex',
        margin: 'auto',
        width: '380px',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: "0px 00px 20px #1976d2",
        borderRadius: "10px",
        fontFamily: 'auto',
        '& .MuiTable-root': {
            borderBottom: 'none !important',
            paddingTop: '20px',
            paddingBottom: '20px',
        },
        '& .MuiTableCell-root': {
            fontSize: '18px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            background: '#8080800f',
            border: '1px solid #fff'
        },
        '& .MuiOutlinedInput-root': {
            height: '40px',
        },
        '@media (max-width: 425px)': {
            height: '70vh',
            width: '100vw',
            boxShadow: "0px 00px 0px #1976d2",
            margin: '0px',
        },
        '@media (max-width: 350px)': {
            height: '70vh',
            width: '100vw',
            padding: " 30px",
            boxShadow: "0px 00px 0px #1976d2",
            margin: '0px',
        }
    },

}