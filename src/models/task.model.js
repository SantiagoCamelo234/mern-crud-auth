import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Tipo de dato del id
        ref: 'User', // Hace referencia al modelo de User
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Task', taskSchema)