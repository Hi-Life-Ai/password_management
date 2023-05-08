const express = require ('express');
const passwordRoute = express.Router();

//Password Management login
const { getAllPasswords, addPasswords, getSinglePasswords, updatePasswords, deletePasswords } = require('../controller/password');

passwordRoute.route('/passwords').get(getAllPasswords);
passwordRoute.route('/password/new').post(addPasswords);
passwordRoute.route('/password/:id').get(getSinglePasswords).put(updatePasswords).delete(deletePasswords);

module.exports = passwordRoute;