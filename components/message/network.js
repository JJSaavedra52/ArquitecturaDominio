const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller')
const router = express.Router();

const upload = multer({
    dest: 'public/files/',
})

router.get('/', (req, res) => {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
})

router.post('/', upload.single('file'), (req, res) => {
    console.log(req.files);

    controller.addMessage(req.body.user, req.body.message, req.files)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        }).catch(e => {
            response.error(req, res, 'Información invalida', 400, 'Error en el controlador');
        })
})

router.patch('/:id', (req, res, message) => {
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
})

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        })
})

module.exports = router;



// router.delete('/message', (req, res) => {
//     console.log(req.body);
//     console.log(req.query);
//     res.status(201).send('Se elimino el mensaje');
// })