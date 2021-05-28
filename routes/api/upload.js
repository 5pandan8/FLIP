const express = require('express');
const upload = require('express-fileupload')
const spawn = require('child_process').spawn
const path = require('path')
const db = require("../../db");

router = express.Router();

router.use(upload())


router.post('/', (req, res) =>{
    const file = req.files.file
    const filename = file.name

    file.mv('./uploads/'+filename, (err) =>{
        if(err){
            console.log(err)
            res.status(400).json({msg: "Error occured while uploading file", error: err})
        }
        else{
            file_path = path.join(path.dirname(path.dirname(__dirname)), 'uploads', filename)
            file_name_noExt = path.basename(filename.toLowerCase(), '.pdf')

            newBook = {
                BookName: file_name_noExt,
                pages: []
            }

            db.getDB().collection(db.collection).insertOne(newBook, (err, result) =>{
                if(err){
                    console.log(err);
                }   
            });

            const process = spawn('python', ['./pymain.py', file_path, file_name_noExt]) 
            process.stdout.on('data', data =>{
                console.log(data.toString())
            })
            res.status(200).json({msg: `File ${filename} is successfully uploaded`})
      
        }

    })
})

module.exports = router
