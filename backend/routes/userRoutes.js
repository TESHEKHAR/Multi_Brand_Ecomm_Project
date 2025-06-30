import express from 'express';
import {
    approvalUserAndSendLink,
    forgotPassword,
    getAllUsers,
    loginUser,
    logoutUser,
    registerUser,
    resetPassword,
    setPassword
  } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.put('/admin/approve/:userId', approvalUserAndSendLink);
router.post('/user/set-password', setPassword);
router.post('/login',loginUser);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);
router.post('/logout',verifyToken,logoutUser);
router.get('/user',getAllUsers);

export default router;
