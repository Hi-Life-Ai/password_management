const express = require ('express');
const folderRoute = express.Router();

//Folder Management login
const { getAllFolders, addFolders, getSingleFolders, updateFolders, deleteFolders } = require('../controller/folder');

folderRoute.route('/folders').get(getAllFolders);
folderRoute.route('/folder/new').post(addFolders);
folderRoute.route('/folder/:id').get(getSingleFolders).put(updateFolders).delete(deleteFolders);

module.exports = folderRoute;