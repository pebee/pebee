'use strict';

import express from 'express';
import GoogleCloudStorage from './../utils/storage';
import multer from 'multer';


const router = express.Router();
const GCS = new GoogleCloudStorage();
const upload = multer();


// get all files from given directory
router.get('/files', (req, res) => {

    GCS.getObjects(req.query['directory']).then(files => {
        res.send(pebee.api.responses.single(files));
    });

});


// download file
router.get('/download', (req, res) => {

    GCS.downloadFile(req.query['filename']).then(content => {
        res.send(content);
    }).catch(e => {
        pebee.logger.info(e);
        res.status(400).send({ message: _t('pebee.storage.fileDownloadFailure') });
    });

});


// delete file
router.post('/delete', (req, res) => {

    GCS.deleteFile(req.body['filename']).then(() => {
        res.send({ message: _t('pebee.storage.fileDeleteSuccess') });
    }).catch(e => {
        pebee.logger.info(e);
        res.status(400).send({ message: _t('pebee.storage.fileDeleteFailure') });
    });

});



// upload files
router.post('/upload', upload.array('files'), (req, res, next) => {

    try {
        GCS.uploadFiles(req.files, req.body['directory']);
        res.send({ message: _t('pebee.storage.fileUploadSuccess') });
    } catch (e) {
        res.status(400).send({ message: _t('pebee.storage.fileUploadFailure') });
    }

});


// create new directory
router.post('/create_dir', (req, res) => {

    try {
        GCS.createDirectory(req.body['directory'], req.body['newDir']);
        res.send({ message: _t('pebee.storage.folderCreateSuccess') });
    } catch (e) {
        res.status(400).send({ message: _t('pebee.storage.folderCreateError') });
    }

});


export default router;