/**
 * Google Cloud Storage configuration
 */

const GCS = require('@google-cloud/storage').Storage;


const storage = new GCS({
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: process.env.GCS_KEY_FILENAME
});

const bucket = storage.bucket(process.env.GCS_BUCKET);



module.exports = {
    bucket,
    storage
};