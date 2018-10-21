'use strict';

import express from 'express';

import userRouter               from './user';
import authRouter               from './auth';
import accountCategoryRouter    from './accountCategory';
import permissionRouter         from './permission';
import storageRouter            from './storage';


const router = express.Router();


router.use('/users',                userRouter);
router.use('/account_categories',   accountCategoryRouter);
router.use('/permissions',          permissionRouter);
router.use('/storage',              storageRouter);
router.use('/',                     authRouter);


export default router;
