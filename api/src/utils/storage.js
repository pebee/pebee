'use strict';

import { storage, bucket } from './../../config/storage';


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

                if (objectNameArray.length === 1) {
                    files.push(object);
                } else if (objectNameArray.length === 2 && object.name.endsWith('/')) {
                    folders.push(object);
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