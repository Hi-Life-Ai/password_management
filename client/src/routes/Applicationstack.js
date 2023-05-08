import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin
import Dashboard from '../pages/admin/dashboard/Dashboard';
import Adminuserprofile from '../pages/admin/navbar/Profile';
  //  Admin folder
  import Folderlist from '../pages/admin/folder/List';
  import Folderview from '../pages/admin/folder/View';
  //  Admin user
  import Userlist from '../pages/admin/users/List';
  import Usercreate from '../pages/admin/users/Create';
  import Useredit from '../pages/admin/users/Edit';
  import Userview from '../pages/admin/users/View';
  //  Admin password
  import Passwordlist from '../pages/admin/password/List';
  import Passwordcreate from '../pages/admin/password/Create';
  import Passwordedit from '../pages/admin/password/Edit';
  import Passwordview from '../pages/admin/password/View';


//User 
import Userdashboard from '../pages/user/Dashboard';
import Userprofile from '../pages/user/navbar/Profile';
import Passworduser from '../pages/user/folder/List';
import AssignedPasswordlist from '../pages/admin/password/Assignedpassword';


import { AuthContext } from '../context/Appcontext';

function Applicationstack () {

    const { auth } = useContext(AuthContext);
    
    return(
        <BrowserRouter>
            <Routes>
                <Route>
                    {auth.loginuserdesignation === "Admin" ? (
                         <>
                            {/* Admin */}
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/admin/profile/:id" element={<Adminuserprofile />} />

                            {/* Folder */}
                            <Route path="/admin/folder/list" element={<Folderlist />} />
                            <Route path="/admin/folder/view/:id" element={<Folderview />} />

                            {/* User */}
                            <Route path="/admin/user/list" element={<Userlist />} />
                            <Route path="/admin/user/create" element={<Usercreate />} />
                            <Route path="/admin/user/edit/:id" element={<Useredit />} />
                            <Route path="/admin/user/view/:id" element={<Userview />} />

                            {/* Password */}
                            <Route path="/admin/password/list" element={<Passwordlist />} />
                            <Route path="/admin/password/create" element={<Passwordcreate />} />
                            <Route path="/admin/password/edit/:id" element={<Passwordedit />} />
                            <Route path="/admin/password/view/:id" element={<Passwordview />} />
                            <Route path="/admin/password/assignpassword" element={<AssignedPasswordlist />} />
                            
                         </>
                     ) : (  
                        <>
                            {/* User */}
                            <Route path="/" element={<Userdashboard />} />
                            <Route path="/user/profile/:id" element={<Userprofile />} />
                            <Route path="/user/password" element={<Passworduser />} />

                        </>
                      )  

                     }  
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Applicationstack;
