const { Schema, model } = require('mongoose');

const StudentSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    age: {
        type: Number,
        required: [true, 'La edad es obligatoria']
    },
    active: {
        type: Boolean,
        default: false
    }
});

StudentSchema.methods.toJSON = function() {
    const { __v, ...student  } = this.toObject();
    return student;
}

module.exports = model( 'Student', StudentSchema );