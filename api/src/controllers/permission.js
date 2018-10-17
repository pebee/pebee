'use strict';

import express from 'express';


const router = express.Router();


// validate permissions - in this case we use account category permissions
router.all(/(^\/$)|(^\/(\d+|all)$)/, (req, res, next) => {

    if ( req.method !== 'OPTIONS' ) {

        let permissionLabel = pebee.functions.generateCRUDPermissionLabel('account-categories', req.method);

        if (pebee.functions.validatePermission(req.user, permissionLabel)) {
            next();
        } else {
            res.status(401).send(pebee.api.responses.notAuthorized());
        }

    } else {
        next();
    }

});


router.get('/all', (req, res) => {

    pebee.models.Permission.findAll().then(permissions => {
        let mappedPermissions = permissions.map(permission => {
            return permission.serialize();
        });

        res.send(pebee.api.responses.list(mappedPermissions));
    });
    
});


export default router;