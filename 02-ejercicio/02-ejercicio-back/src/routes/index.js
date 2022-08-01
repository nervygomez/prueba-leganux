const { Router } = require("express");
const router = Router();

const studentRoute  = require('./student.route')
const classroomRoute  = require('./class-room.route')


router.use('/student', studentRoute)
router.use('/classroom', classroomRoute)


module.exports = router;