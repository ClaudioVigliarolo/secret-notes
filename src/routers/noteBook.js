const express = require('express')
const Notebook = require('../models/notebook')
const Task = null;
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/notebooks', auth, async (req, res) => {
    const newNotebook = new Notebook({
        ...req.body,
        owner: req.user._id
    })

    try {
        await newNotebook.save()
        res.status(201).send();
    } catch (e) {

        res.status(400).send(e)
    }
})


router.get('/notebooks/:id', auth, async (req, res) => {
    try {
        const notebooks = await Notebook.find({ owner: req.params.id }, { notes: 0 }).sort([['updatedAt', 'descending']]);
        if (!notebooks) {
            throw new Error()
        }
        res.send(notebooks)
    } catch (e) {
        res.status(500).send()
    }

});


router.post('/notebooks/:id', auth, async (req, res) => {

    const notebook = await Notebook.findOne({ _id: req.params.id })
    try {
        await notebook.createNote(req.body);
        res.status(201).send(notebook);
    } catch (e) {
        res.status(400).send(e);
    }
})


router.get('/notebook/:id', auth, async (req, res) => {
    try {
        const notes = await Notebook.findOne({ _id: req.params.id }, { notes: 1, _id: 0 });

        if (!notes) {
            throw new Error()
        }
        res.send(notes)
    } catch (e) {
        res.status(500).send()
    }

});


router.delete('/notebook/:notebookId/:id', auth, async (req, res) => {

    console.log("cjaimmat", req.params.notebookId, req.params.id)
    try {
        const notes = await Notebook.findById({ _id: req.params.notebookId });

        await notes.findByIdAndRemove(req.params.id);
        res.status(201).send(notes);
    } catch (e) {
        console.log(e)
        res.status(500).send();
    }

});



router.patch('/notebook/:notebookId', auth, async (req, res) => {
    console.log("00000''", req.params.notebookId, req.body.name)
    try {
        const updatedNotebook = await Notebook.findByIdAndUpdate({ _id: req.params.notebookId },
            { name: req.body.name });

        //   await updatedNotebook.findByIdAndUpdate(req.body.note, req.params.id);

        res.status(201).send(updatedNotebook);
    } catch (e) {
        console.log(e)

        res.status(500).send();
    }
})
//delete
router.delete('/notebook/:notebookId', auth, async (req, res) => {
    console.log("00000''", req.params.notebookId)
    try {
        const updatedNotebook = await Notebook.findByIdAndDelete({ _id: req.params.notebookId });
        res.status(201).send(updatedNotebook);
    } catch (e) {
        console.log(e)

        res.status(500).send();
    }
})




router.patch('/notebook/:notebookId/:id', auth, async (req, res) => {
    try {
        const updatedNotebook = await Notebook.findById({ _id: req.params.notebookId });

        await updatedNotebook.findByIdAndUpdate(req.body.note, req.params.id);

        res.status(201).send(updatedNotebook);
    } catch (e) {
        console.log(e)

        res.status(500).send();
    }
})


router.get('/notebook:id', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'notebooks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.notebooks)
    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router