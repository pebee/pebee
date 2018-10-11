'use strict';

import express from 'express';


const router = express.Router();

// check permission for basic CRUD operations
router.all(/(^\/$)|(^\/(\d+|all)$)/, (req, res, next) => {

    let permissionLabel = pebee.functions.generateCRUDPermissionLabel('account-categories', req.method);

    if (pebee.functions.validatePermission(req.user, permissionLabel)) {
        next();
    } else {
        res.status(401).send(pebee.api.responses.notAuthorized());
    }

});


// return all account categories
router.get('/all', (req, res) => {

    pebee.models.AccountCategory.scope('withUsersCount').findAll().then(accountCategories => {
        let mappedAccountCategories = accountCategories.map(accountCategory => {
            return accountCategory.serialize();
        });

        res.send(pebee.api.responses.list(mappedAccountCategories));
    });

});


// return single account category by given ID
router.get('/:id', (req, res) => {

    pebee.models.AccountCategory.scope(['withPermissions']).findById(req.params['id']).then(accountCategory => {
        if (accountCategory) {
            res.send(pebee.api.responses.single(accountCategory.serialize()));
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('Account category does not exist'), { id: req.params['id'] }));
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
        console.log(e);
        res.status(422).send({ statusCode: 422, message: _t('Error while creating new account category') });
    });

});


// update specified account category
router.put('/:id', (req, res) => {

    pebee.models.AccountCategory.findById(req.params['id']).then(accountCategory => {
        if (accountCategory) {
            accountCategory.update(req.body).then(self => {
                res.send(pebee.api.responses.updated(self.serialize()));
            });
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('Account category does not exist'), { id: req.params['id'] }));
        }
    }).catch(e => {
        res.status(422).send({ message: _t('Error while updating account category') });
    });
    
});


// delete specified account category
router.delete('/:id', (req, res) => {

    pebee.models.AccountCategory.findById(req.params['id']).then(accountCategory => {
        if (accountCategory) {
            accountCategory.destroy().then(() => {
                res.send(pebee.api.responses.deleted(_t('Account category has been deleted')));
            });
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('Account category does not exist'), { id: req.params['id'] }));
        }
    }).catch(e => {
        res.status(400).send({ message: _t('Error while deleting account category') });
    });

});


export default router;