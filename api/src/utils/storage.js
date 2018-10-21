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