'use strict';

import winston from 'winston';


const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'pebee-logs.log' })
    ]
});


export default logger;