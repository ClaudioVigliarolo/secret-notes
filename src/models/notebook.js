const mongoose = require('mongoose')

const NotebookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    notes: [{
        note: {
            title: {
                type: String,
                required: true,
                trim: true
            },

            description: {
                type: String,

            },
            completed: {
                type: Boolean,
                default: false
            },

            color: {
                type: String,
                default: '#fff'
            },

            date: {
                type: Date,
                default: Date.now()
            }

        },
    }],


}, {
    timestamps: true
})


NotebookSchema.methods.createNote = async function (newNote) {
    const Notebook = this
    try {
        Notebook.notes = [newNote].concat(Notebook.notes);
        await Notebook.save();
    } catch (e) {
        throw new Error(e)
    }

    return true;
}

NotebookSchema.methods.findByIdAndRemove = async function (noteId) {
    const Notebook = this
    try {
        Notebook.notes = Notebook.notes.filter(item => item._id != noteId);
        await Notebook.save();
    } catch (e) {
        throw new Error(e)
    }

    return true;
}


NotebookSchema.methods.findByIdAndUpdate = async function (newNote, noteId) {
    const Notebook = this
    try {
        const noteIndex = Notebook.notes.findIndex(note => note._id == noteId);
        Notebook.notes[noteIndex].note.title = newNote.title;
        Notebook.notes[noteIndex].note.color = newNote.color;
        Notebook.notes[noteIndex].note.description = newNote.description;
        Notebook.notes[noteIndex].note.completed = newNote.completed;
        await Notebook.save();
    } catch (e) {
        throw new Error(e)
    }

    return true;
}


const Notebook = mongoose.model('Notebook', NotebookSchema)

module.exports = Notebook