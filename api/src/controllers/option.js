'use strict';

import express from 'express';


const router = express.Router();


// return all options
router.get('/all', (req, res) => {

    pebee.models.Option.findAll().then(options => {
        let mappedOptions = options.map(option => {
            return option.serialize();
        });

        res.send(pebee.api.responses.list(mappedOptions));
    });

});


// get current language
router.get('/language', (req, res) => {

    pebee.models.Option.findById('lang').then(option => {
        if (option) {
            res.send({ statusCode: 200, data: { language: _t(`pebee.options.${option.value}`), code: option.value } });
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.options.notFound'), { key: 'lang' }));
        }
    });

});


// get available options for specified key
router.get('/available-options', (req, res) => {

    Promise.resolve(pebee.models.Option.getAvailableOptions(req.query['key'])).then(options => {
        res.send({ statusCode: 200, data: options });
    }).catch(e => {
        res.status(400).send({ statusCode: 400, message: e.message });
    });

});


// change language by 'code' query parameter
// example: /api/options/change-language?code=pl
router.get('/change-language', (req, res) => {

    pebee.models.Option.findById('lang').then(option => {
        if (option) {
            return option.update({ value: req.query['code'] || '' }).then(self => {
                res.send(pebee.api.responses.updated(self.serialize()));
            });
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.options.notFound'), { key: 'lang' }));
        }
    }).catch(e => {
        pebee.logger.error(e);
        res.status(422).send(pebee.api.responses.modelError(e));
    });

});


// return single option by key
router.get('/:key', (req, res) => {

    pebee.models.Option.findById(req.params['key']).then(option => {
        if (option) {
            res.send(pebee.api.responses.single(option.serialize()));
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.options.notFound'), { key: req.params['key'] }));
        }
    });

});


// create new option
router.post('/', (req, res) => {

    pebee.models.Option.create(req.body).then(option => {
        res.send(pebee.api.responses.created(option.serialize()));
    }).catch(e => {
        res.status(422).send(pebee.api.responses.modelError(e));
    });

});


// update single option
router.put('/:key', (req, res) => {

    pebee.models.Option.findById(req.params['key']).then(option => {
        if (option) {
            return option.update(req.body).then(self => {
                res.send(pebee.api.responses.updated(self.serialize()));
            });
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.options.notFound'), { key: req.params['key'] }));
        }
    }).catch(e => {
        res.status(422).send(pebee.api.responses.modelError(e));
    });

});


// delete single option (if not protected)
router.delete('/:key', (req, res) => {

    pebee.models.Option.findById(req.params['key']).then(option => {
        if (option) {
            if (option.get('isProtected')) {
                res.status(400).send({ statusCode: 400, message: _t('pebee.options.forbidDeleteProtected') });
            } else {
                return option.destroy().then(() => {
                    res.send(pebee.api.responses.deleted({ message: _t('pebee.options.deleteSuccess') }));
                });
            }
        } else {
            res.status(404).send(pebee.api.responses.notFound(_t('pebee.options.notFound'), { key: req.params['id'] }));
        }
    }).catch(e => {
        pebee.logger.error(e);
        res.status(400).send({ message: _t('pebee.global.operationError') });
    });

});


export default router;