const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require('../middleware/validator-fields.middleware')
const {
    getAllStudent, 
    postStudent, 
    putStudent, 
    deleteStudent } = require('../controllers/student.controller')
const router = Router();

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('age', 'La edad es obligatoria').not().isEmpty(),
    validateFields
], postStudent)
router.get('/all', getAllStudent)
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validateFields], putStudent)
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validateFields], deleteStudent)

module.exports = router;