'use strict';

import express from 'express';
import GoogleCloudStorage from './../utils/storage';
import multer from 'multer';
import { bucket } from './../../config/storage';


const router = express.Router();
const GCS = new GoogleCloudStorage();
const upload = multer();


router.get('/files', (req, res) => {

    GCS.getObjects(req.query['directory']).then(files => {
        res.send(pebee.api.responses.single(files));
    });

});



router.post('/upload', upload.array('files'), (req, res, next) => {

    req.files.forEach(file => {
        let bucketFile = bucket.file(req.body['directory'] + file.originalname);

        let bucketFileStream = bucketFile.createWriteStream({
            contentType: 'auto',
            resumable: false
        });

        bucketFileStream.on('error', err => { return res.status(400).send(err) });
        bucketFileStream.on('finish', () => {});
        bucketFileStream.end(file.buffer);
    });

    res.send(req.body);

});


router.post('/create_dir', (req, res) => {

    let bucketFile = bucket.file(req.body['directory'] + req.body['newDir'] + '/');
    
    let bucketFileStream = bucketFile.createWriteStream({
        contentType: 'auto'
    });

    bucketFileStream.on('error', err => {
        return res.status(400).send({ message: _t('pebee.storage.folderCreateError') });
    });
    bucketFileStream.on('finish', () => {});
    bucketFileStream.end();

    res.send({ message: _t('pebee.storage.folderCreateSuccess') });

})


export default router;