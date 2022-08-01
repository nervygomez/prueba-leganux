const { response, request } = require('express');

const Student = require('../models/student.model');

const getAllStudent = async (req = request, res = response) => {
    try {
        const student = await Student.find();

        res.json({
            student
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error,
            msg: 'Error del Servidor'
        })
    }
}

const postStudent = async (req = request, res = response) => {

    try {
        const { name, age } = req.body;
        const student = new Student({ name, age });

        await student.save();

        res.json({
            student
        });
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error del Servidor'
        })

    }
}

const putStudent = async (req = require, res = response) => {

    try {
        const { id } = req.params;
        const body = req.body;

        await Student.findByIdAndUpdate(id, body);

        res.json(
            "Estudiante Actualizado"
        )
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error del Servidor'
        })
    }


}

const deleteStudent = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);

        res.json({
            msg: 'Estudiante eliminado',
            student
        })
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error del Servidor'
        })
    }
}


module.exports = {
    deleteStudent,
    getAllStudent,
    postStudent,
    putStudent
}
