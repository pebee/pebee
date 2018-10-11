'use strict';

import jwt from 'jsonwebtoken';


/**
 * Generate JWT token with encrypted data using Secret Key.
 * 
 * @param {Object} data Data to be encrypted within token
 */
export const createToken = (data) => {

    return jwt.sign(
        data,
        process.env.AUTH_SECRET_KEY,
        {
            expiresIn: parseInt(process.env.TOKEN_EXPIRATION)
        }
    );

};


/**
 * Verifies if given token is valid and returns it's decrypted data (if valid).
 * 
 * @param {String} token Token to be verified
 */
export const verifyToken = (token) => {

    return jwt.verify(
        token,
        process.env.AUTH_SECRET_KEY
    );

};


/**
 * Grab token from authorization header, verify it and return it's decrypted data.
 * If token is invalid (or there is no token), return 401 unauthorized response.
 * 
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Middleware next method to continue request
 */
export const authorize = (req, res, next) => {

    if ( req.method === 'OPTIONS' ) {
        next();
    } else {

        try {
            let authorizationToken = req.cookies['authorizationToken'];

            if (authorizationToken) {
                let tokenData = verifyToken(authorizationToken);

                pebee.models.User.scope(['withPermissions']).findById(tokenData.id).then(user => {
                    if (user) {
                        req.user = user.serialize();
                        next();
                    } else {
                        throw new Error();
                    }
                });
            } else {
                throw new Error();
            }
        } catch (e) {
            pebee.logger.info(e);
            res.clearCookie('authorizationToken', { httpOnly: true });
            res.status(401).send(pebee.api.responses.notAuthorized());
        }

    }
    
};