'use strict';

import express from 'express';

import { createToken, verifyToken } from './../utils/api/auth';

const router = express.Router();


/**
 * Login route. Verifies provided username and password. If they are correct
 * the API sets a HttpOnly cookie with Authorization Token for the session lifetime
 */
router.post('/login', (req, res) => {

    pebee.models.User.verifyPassword(req.body).then(user => {
        if (user) {
            let userData = user.serialize(),
                token;

            try {
                if (req.cookies['authorizationToken'] && verifyToken(req.cookies['authorizationToken']) ) {
                    token = req.cookies['authorizationToken'];
                } else {
                    token = createToken({ id: user.get('id') });
                }    
            } catch (e) {
                throw e;
            }
                
            let cookieExpiration = parseInt(process.env.TOKEN_EXPIRATION) * 1000;
            res.cookie(
                'authorizationToken',
                token,
                { httpOnly: true, expires:  new Date(Date.now() + cookieExpiration) }
            );

            res.send({
                message: _t('Login successful'),
                data: userData
            });
        } else {
            res.status(403).send(pebee.api.responses.loginError());
        }
    }).catch(e => {
        res.status(403).send(pebee.api.responses.loginError());
    });

});


router.get('/me', (req, res) => {

    res.send(req.user);

});


export default router;