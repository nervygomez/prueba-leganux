const { Schema, model } = require('mongoose');

const ClassRoomSchema = Schema({
    class: {
        type: String,
        required: [true, 'La clase es obligatoria']
    },
    order: {
        type: Number,
        required: [true, 'El orden es obligatorio']
    },
    numberStudents: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: true
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'Student',
    }
});

ClassRoomSchema.methods.toJSON = function() {
    const { __v, ...classroom  } = this.toObject();
    return classroom;
}

module.exports = model( 'ClassRoom', ClassRoomSchema );