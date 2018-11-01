'use strict';

import express from 'express';


const router = express.Router();

// check permission for basic CRUD operations
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


// return all account categories
router.get('/all', (req, res) => {

    pebee.models.AccountCategory.scope('withUsersCount').findAll({ paranoid: false }).then(accountCategories => {
        let mappedAccountCategories = accountCategories.map(accountCategory => {
            return accountCategory.serialize();
        });

        res.send(pebee.api.responses.list(mappedAccountCategories));
    });

});


// return single account category by given ID
router.get('/:id', (req, res) => {

    pebee.models.AccountCategory.scope(['withPermissions']).findById(req.params['id'], { paranoid: false }).then(accountCategory => {
        if (accountCategory) {
            res.send(pebee.api.responses.single(accountCategory.serialize()));
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.accountCategories.doesNotExist'), { id: req.params['id'] }));
        }
    });

});


// return paginated account categories
router.get('/', (req, res) => {

    let query = pebee.functions.preparePaginationQuery(req, pebee.models.User);

    pebee.models.AccountCategory.findAll(query).then(accountCategories => {
        let mappedAccountCategories = accountCategories.map(accountCategory => {
            return accountCategory.serialize();
        });

        res.send(pebee.api.responses.list(mappedAccountCategories));
    });

});


// create new account category
router.post('/', (req, res) => {

    pebee.models.AccountCategory.create(req.body).then(accountCategory => {
        res.send(pebee.api.responses.created(accountCategory.serialize()));
    }).catch(e => {
        pebee.logger.error(e);
        res.status(422).send({ statusCode: 422, message: _t('pebee.accountCategories.errorWhileCreating') });
    });

});


// update specified account category
router.put('/:id', (req, res) => {

    pebee.models.AccountCategory.findById(req.params['id']).then(accountCategory => {
        if (accountCategory) {
            return accountCategory.update(req.body).then(self => {

                if (Array.isArray(req.body.permissions)) {
                    return self.setPermissions(req.body.permissions).then(() => {
                        res.send(pebee.api.responses.updated(self.serialize()));
                    });
                } else {
                    res.send(pebee.api.responses.updated(self.serialize()));
                }
                
            });
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.accountCategories.doesNotExist'), { id: req.params['id'] }));
        }
    }).catch(e => {
        pebee.logger.error(e);
        res.status(422).send({ message: _t('pebee.accountCategories.errorWhileUpdating') });
    });
    
});


// delete specified account category
router.delete('/:id', (req, res) => {

    pebee.models.AccountCategory.findById(req.params['id']).then(accountCategory => {
        if (accountCategory) {
            accountCategory.destroy().then(() => {
                res.send(pebee.api.responses.deleted(_t('pebee.accountCategories.deleteSuccess')));
            });
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.accountCategories.doesNotExist'), { id: req.params['id'] }));
        }
    }).catch(e => {
        res.status(400).send({ message: _t('pebee.accountCategories.errorWhileDeleting') });
    });

});


// restore specified account category
router.put('/:id/restore', (req, res) => {

    pebee.models.AccountCategory.findById(req.params['id'], { paranoid: false }).then(accountCategory => {
        if (accountCategory) {
            accountCategory.restore().then(() => {
                res.send(pebee.api.responses.restored(_t('pebee.accountCategories.restoreAccountCategory')));
            }).catch(e => {
                res.status(400).send(pebee.api.responses.modelError(e));
            });
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.accountCategories.notFound'), { id: req.params['id'] }));
        }
    });

})


export default router;