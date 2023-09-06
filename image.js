const express = require('express');
const connection = require('../connection');
const router = express.Router();


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/images')
        },
        filename: (req, file, cb)=>{
            cb(null, file.fieldname + "" + Date.now() + path.extname(file.originalname));
        }
})


const upload = multer({
    storage: storage,
})

const multipleUpload = upload.fields([{ name: 'image1'},{name:'image2'}])

router.post('/upload', upload.single('image'),(req, res)=>{
    console.log(req.file);
    const image = req.file.filename;
    var query = "insert into test.image(imageUrl) values(?)";
    connection.query(query,[image],(err, results)=>{
        if(err) return res.json({message:"Error"});
        return res.json({message:"Success"});
    })
})

/* router.post('/upload',multipleUpload,(req, res)=>{
    const image1 = req.files.image1[0].filename;
    const image2 = req.files.image2[0].filename;
    if(req.files){
        console.log("files uploaded")
      //  console.log(req.files)
        console.log(req.files.image1[0].filename)
        console.log(req.files.image2[0].filename)

        var query = "insert into test.image(image1,image2) values(?,?)";
        connection.query(query,[image1,image2],(err, results)=>{
            if(err) return res.json({message:"Error"});
            return res.json({message:"Success"});
        })
      
    }
}) */

router.get('/display',(req, res)=>{
    var query = "select * from test.image";
    connection.query(query,(err, results)=>{
        if(err) return res.json({message:"Error"});
        return res.json(results);
    })
})

module.exports = router;