'use strict';

import { storage, bucket } from './../../config/storage';


class GCSFile {

    constructor(file, name) {
        this.fullName = file.name;
        this.name = name;
        this.createDate = file.metadata.timeCreated;
        this.contentType = file.metadata.contentType;
    }

}


class GoogleCloudStorage {

    constructor() {
        this.storage = storage;
        this.bucket = bucket;
    }

    /**
     * Download given file from GCS
     * 
     * @param {String} filename Full name of file to be downloaded
     */
    downloadFile(filename) {

        let bucketFile = this.bucket.file(filename);

        if (bucketFile) {
            return bucketFile.download().then(result => {
                return result[0];
            });
        } else {
            return new Promise((resolve, reject) => {
                reject(_t('pebee.storage.fileDoesNotExist'));
            });
        }

    }

    /**
     * Delete given file from GCS
     * 
     * @param {String} filename Full name of file to be deleted
     */
    deleteFile(filename) {

        let bucketFile = this.bucket.file(filename);

        if (bucketFile) {
            return bucketFile.delete();
        } else {
            return Promise.reject(_t('pebee.storage.fileDoesNotExist'));
        }

    }

    /**
     * Upload multiple files
     * 
     * @param {Array} files Array of files
     * @param {String} directory Name of directory to which files will be uploaded
     */
    uploadFiles(files, directory) {

        files.forEach(file => {

            let bucketFile = this.bucket.file(directory + file.originalname);

            let bucketFileStream = bucketFile.createWriteStream({
                contentType: 'auto',
                resumable: false
            });

            bucketFileStream.on('error', err => { throw err });
            bucketFileStream.on('finish', () => {});
            bucketFileStream.end(file.buffer);

        });

    }

    /**
     * Create new directory with name <newDir> with it's base <baseDir>
     * e.g. baseDir = 'Media/Users' and newDir = 'user#1' will create 'Media/Users/user#1' folder
     * 
     * @param {String} baseDir Base path of new folder
     * @param {String} newDir Name of new folder
     */
    createDirectory(baseDir, newDir) {
        let bucketFilename = (baseDir && baseDir !== '') ? baseDir + newDir : newDir;
        bucketFilename += '/';

        let bucketFile = this.bucket.file(bucketFilename);
        let bucketFileStream = bucketFile.createWriteStream({
            contentType: 'auto'
        });

        bucketFileStream.on('error', err => { throw err });
        bucketFileStream.on('finish', () => {});
        bucketFileStream.end();
    }

    /**
     * Return all files and folders from given directory
     * 
     * @param {String} directory Name of the directory to be read from
     */
    getObjects(directory = '') {

        if ( ! directory.endsWith('/') && directory !== '' ) {
            directory += '/';
        }

        return this.bucket.getFiles({ directory: directory }).then(result => {
            let objects = result[0];
 
            let files = [],
                folders = [];

            objects.forEach(object => {
                let objectWithoutDir = object.name.substring(object.name.indexOf(directory) + directory.length, object.name.length);

                // check if current object is the directory itself
                if ( objectWithoutDir === '' ) return;

                let objectNameArray = objectWithoutDir.split('/');

                let gcsFile = new GCSFile(object, objectNameArray[0]);

                if (objectNameArray.length === 1) {
                    files.push(gcsFile);
                } else if (objectNameArray.length === 2 && object.name.endsWith('/')) {
                    folders.push(gcsFile);
                }
            });

            return {
                files,
                folders
            };
        });
    }

}


export default GoogleCloudStorage;