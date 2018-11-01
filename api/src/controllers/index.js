'use strict';

import express from 'express';
import extensions from 'pebee-extensions';


import userRouter               from './user';
import authRouter               from './auth';
import accountCategoryRouter    from './accountCategory';
import permissionRouter         from './permission';
import storageRouter            from './storage';
import optionRouter             from './option';


const router = express.Router();


router.use('/users',                userRouter);
router.use('/account_categories',   accountCategoryRouter);
router.use('/permissions',          permissionRouter);
router.use('/storage',              storageRouter);
router.use('/options',              optionRouter);
router.use('/',                     authRouter);


for (let extension in extensions) {
    router.use(`/extensions/${extension}`, extensions[extension].router);
}


export default router;
