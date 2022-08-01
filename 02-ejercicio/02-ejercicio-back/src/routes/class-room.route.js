const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require('../middleware/validator-fields.middleware')
const {
    getAllClassroom,
    putClassroom,
    postClassroom,
    deleteClassroom } = require('../controllers/class-room.controller')
const router = Router();

router.post('/', [
    check('classname', 'la clases es obligatoria').not().isEmpty(),
    check('order', 'El orden es obligatorio').not().isEmpty(),
    validateFields
], postClassroom)
router.get('/all', getAllClassroom)
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validateFields], 
    putClassroom)
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validateFields], 
    deleteClassroom)

module.exports = router;