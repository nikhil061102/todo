import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    isStarred: {
        type: Boolean,
        default: false,
    },
    isDateTimePickerEnabled: {
        type: Boolean,
        default: false,
    },
    deadline: {
        type: String,
        default: undefined
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;