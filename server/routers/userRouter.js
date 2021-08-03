const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const auth = require('../middlewares/auth')
const { createUser, loginUser, logout, updateInfo, addPost, getPosts, userPosts, postFile, getFiles } = require('../controlers/userControler');

const router = new express.Router();

router.post('/create-user', createUser)

router.post('/login-user', loginUser)

router.post('/user/logout-user', auth, logout)

router.patch('/user/update-user', auth, updateInfo)

router.post('/user/add-post', auth, addPost)

router.get('/get-posts', getPosts)

router.get('/user/my-posts',auth,userPosts)

router.post('/user/post-file',auth,upload.single('file'),postFile)

router.get('/files/:key',getFiles)

module.exports = router;