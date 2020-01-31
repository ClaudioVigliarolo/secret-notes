const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
var path = require("path");
var uniqid = require('uniqid');

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        console.error(e)
        res.status(400).send(e)
    }
})




router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


// console.log("reqqqq", req.user.avatar)
//res.send({user: req.user, avatar: user.avatar}) 
router.get('/users/me', auth, async (req, res) => {

    res.send(req.user)

})


//updateUser
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body.newUserData)
    const allowedUpdates = ['firstName', 'lastName', 'email', 'password', 'secret']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        updates.forEach((update) => req.user[update] = req.body.newUserData[update])
        await req.user.save()
        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
})




router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})



router.post("/users/me/avatar", auth, async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const imageId = uniqid();
    let avatarData = req.files.avatar;
    avatarData.mv(path.join(__dirname, `../public/profilePhotos/${imageId}`), async function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        } else {
            await User.findOneAndUpdate({ _id: req.user._id }, { avatar: imageId });
            res.send(`${process.env.REACT_APP_API_ENDPOINT}/${imageId}`);
        }


    });
});


router.get("/users/me/avatar", auth, async (req, res) => {
    if (req.user.avatar !== 'default') {
        `${process.env.REACT_APP_API_ENDPOINT}/users/login`
        res.send(`${process.env.REACT_APP_API_ENDPOINT}/profilePhotos/${req.user.avatar}`);
    }
    else {
        res.status(404).send(undefined)
    }


});

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})



module.exports = router