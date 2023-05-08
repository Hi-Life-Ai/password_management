import React, { useState, useMemo, useEffect, } from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Applicationstack from './routes/Applicationstack';
import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Authstack from './routes/Authstack';
import { AuthContext} from './context/Appcontext';

function App() {

  // Auth login state for access user to dashboard
  const [auth, setAuth] = useState({ loginState: false, APIToken:"", loginuserid:"", loginuserdesignation:"", loginuseruniqid:"" })

  const authContextData = useMemo(() => {
    return { auth, setAuth}
  })

  useEffect(()=> {
    isCheckUserLogin();
  },[]);
  const isCheckUserLogin = async () => {
    let getApiToken = localStorage.getItem('APIToken');
    let getLoginUserid = localStorage.getItem('LoginUserId');
    let getLoginUserdesignation = localStorage.getItem('LoginUserDesignation');
    let getLoginUseruniqid = localStorage.getItem("LoginUseruniqid");
    if(getApiToken){
        try{
          setAuth((prevAuth)=> {
            return {...prevAuth, loginState : true, APIToken : getApiToken, loginuserid: getLoginUserid, loginuserdesignation:getLoginUserdesignation, loginuseruniqid:getLoginUseruniqid}
        });
        }catch(err){
          console.log(err.response.data.message);
        }
    }else{
        setAuth({...auth, loginState: false})
    }  
}

  return (
    <>
      <div>
        <AuthContext.Provider value={authContextData}>
          {!auth.loginState ? <Authstack /> : <Applicationstack /> }
        </AuthContext.Provider>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;