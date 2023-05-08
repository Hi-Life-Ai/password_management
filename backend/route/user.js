const express = require('express');
const authRoute = express.Router();


// connect customer group controller
const { getAllUsers, regAuth,loginOut,loginAuth,getSingleUser,updateUserPwd, updateUser, deleteUser } = require('../controller/user');

authRoute.route('/users').get(getAllUsers);
authRoute.route('/user/new').post(regAuth);
authRoute.route('/userlogin').post(loginAuth);
authRoute.route('/user/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
authRoute.route('/userpw/:id').put(updateUserPwd);
authRoute.route('/userlogout').get(loginOut);

module.exports = authRoute;