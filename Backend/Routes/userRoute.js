const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const multer = require('multer');

const configImg = multer.diskStorage({
    destination: (req, file, callback)=> {
        callback(null, "./uploads")
    },
    filename: (req, file, callback)=> {
        callback(null,`image-${Date.now()}${file.originalname}`)
    }
})

const isImage = (req, file, callback)=> {
    if(file.mimetype.startsWith("image")){
        callback(null, true)
    }else {
        callback(new Error("Image allowed only"))
    }
}

const upload = multer({
    storage: configImg,
    fileFilter : isImage
})

router.get('/', (req, res) => {
    res.send('hello world!');
});

//Post user data********
router.post('/addnewuser', upload.single("photo"), async (req, res) => {
    try {
        // const data = new User(req.body);
        // const savedUser = await data.save(data);
        // console.log(savedUser);
        // res.json({
        //     msg: 'saved successfull',
        //     data: savedUser,
        // });
        let payload = req.body;
        let image = "";
        if(req.file) {
            image = req.file.filename
        }
        payload.photo = image;
        const data = new User(payload);
        const userData = await data.save();
          res.json({
            msg: 'saved successfull',
            data: userData,
        });
    } catch (error) {
        console.log(error);
    }
});
//Get all user data *******
router.get('/getusers', async (req, res) => {
    try {
        const userData = await User.find({});
        res.json({
            data: userData,
        });
    } catch (error) {
        console.log(error);
    }
});

//Get single User Data
router.get('/getsingleusers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userData = await User.findById({ _id: id });
        res.json({
            data: userData,
        });
    } catch (error) {
        console.log(error);
    }
});

//update user
router.put('/updateuser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        });
        res.json({
            data,
        });
    } catch (error) {
        console.log(error);
    }
});

//delete user
router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(req.params.id);
        res.json({
            msg: 'User deleted',
            data,
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
