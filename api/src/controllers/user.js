'use strict';

import express from 'express';

import * as responses from './../utils/api/responses';

const router = express.Router();


// check permission for basic CRUD operations depending on request method
router.all(/(^\/$)|(^\/(\d+|all)$)/, (req, res, next) => {

    if ( req.method !== 'OPTIONS' ) {

        let permissionLabel = pebee.functions.generateCRUDPermissionLabel('users', req.method);

        if (pebee.functions.validatePermission(req.user, permissionLabel) || process.env.USE_AUTH === '0') {
            next();
        } else {
            res.status(401).send(pebee.api.responses.notAuthorized());
        }

    } else {
        next();
    }

});



/**
 * Return all users
 */
router.get('/all', (req, res) => {

    pebee.models.User.findAll().then(users => {
        let mappedUsers = users.map(user => {
            return user.serialize();
        });

        res.send(pebee.api.responses.list(mappedUsers));
    });

});


/**
 * Return paginated users
 */
router.get('/', (req, res) => {

    let query = pebee.functions.preparePaginationQuery(req, pebee.models.User);
    query['paranoid'] = false;

    pebee.models.User.scope(['withAccountCategory']).findAll(query).then(users => {
        let mappedUsers = users.map(user => {
            return user.serialize();
        });

        pebee.models.User.count({ paranoid: false }).then(totalRows => {
            res.send(pebee.api.responses.list(mappedUsers, totalRows));
        })
    });

});


/**
 * Return single user by given ID
 */
router.get('/:id', (req, res) => {

    pebee.models.User.scope(['withAccountCategory']).findById(req.params['id'], { paranoid: false }).then(user => {
        if (user) {
            res.send(responses.single(user.serialize()));
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.users.doesNotExist'), { id: req.params['id'] }));
        }
    });

});


/**
 * Create new user
 */
router.post('/', (req, res) => {

    pebee.models.User.create(req.body).then(user => {
        res.send(pebee.api.responses.created(user.serialize()));
    }).catch(e => {
        res.status(422).send(pebee.api.responses.modelError(e));
    });

});


/**
 * Update user with given ID
 */
router.put('/:id', (req, res) => {

    pebee.models.User.findById(req.params['id'], { paranoid: false }).then(user => {
        if (user) {
            user.update(req.body).then(self => {
                res.send(pebee.api.responses.updated(self.serialize()));
            }).catch(e => {
                res.status(422).send(pebee.api.responses.modelError(e));
            });
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.users.doesNotExist'), { id: req.params['id'] }));
        }
    }).catch(e => {
        res.status(422).send({ message: _t('pebee.users.errorWhileUpdating') });
    });

});


/**
 * Restore user with given ID
 */
router.put('/:id/restore', (req, res) => {

    pebee.models.User.findById(req.params['id'], { paranoid: false }).then(user => {
        if (user) {
            user.restore().then(() => {
                res.send(pebee.api.responses.restored(_t('pebee.users.restoreUser')));
            }).catch(e => {
                res.status(422).send(pebee.api.responses.modelError(e));
            });
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.users.doesNotExist'), { id: req.params['id'] }));
        }
    }).catch(e => {
        res.status(422).send({ message: _t('pebee.users.errorWhileRestoring') });
    });

});


/**
 * Delete user with given ID
 */
router.delete('/:id', (req, res) => {

    pebee.models.User.findById(req.params['id']).then(user => {
        if (user) {
            user.destroy().then(() => {
                res.send(pebee.api.responses.deleted(_t('pebee.users.deleteSuccess')));
            });
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.users.doesNotExist'), { id: req.params['id'] }));
        }
    }).catch(e => {
        res.status(400).send({ message: _t('pebee.users.errorWhileDeleting') });
    });

});



export default router;