'use strict';

import express from 'express';

import userRouter               from './user';
import authRouter               from './auth';
import accountCategoryRouter    from './accountCategory';


const router = express.Router();


router.use('/users',                userRouter);
router.use('/account_categories',   accountCategoryRouter);
router.use('/',                     authRouter);


export default router;
