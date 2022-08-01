const { response, request } = require('express');

const ClassRoom = require('../models/class-room.model');


const getAllClassroom = async (req = request, res = response) => {

    try {
        const classroom = await ClassRoom.find().populate('students');

        res.json({
            classroom
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error,
            msg: 'Error del Servidor'
        })
    }
}

const postClassroom = async (req = request, res = response) => {

    try {
        const { active, students, classname, order } = req.body;

        const classroom = new ClassRoom({ class: classname, order, students, numberStudents: students.length })

        await (await classroom.save()).populate('students')

        res.json({
            classroom
        });
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error del Servidor'
        })
    }
}



const putClassroom = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const { active, students, classname, order } = req.body;

        await ClassRoom.findByIdAndUpdate(id, { class: classname, order, students, numberStudents: students.length, active });

        res.json(
            "Clase Actualizada"
        )
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error del Servidor'
        })
    }
}
const deleteClassroom = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const classroom = await ClassRoom.findByIdAndDelete(id);

        res.json({
            msg: 'clase eliminada',
            classroom
        })
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error del Servidor'
        })
    }
}

module.exports = {
    getAllClassroom,
    postClassroom,
    putClassroom,
    deleteClassroom
}