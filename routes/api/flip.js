const express = require('express');
const db = require("../../db");
const spawn = require('child_process').spawn
const request = require('request')
const cheerio = require('cheerio')

router = express.Router();

router.get("/book", (req, res) =>{
    const bookname = req.query.bookName;

    if (!bookname)
        return res.status(400).json({msg: "Enter BookName"})
    else{

        db.getDB().collection(db.collection).find({BookName: bookname}).toArray((err, document) =>{
            if (err)
                console.log(err);
            else{
                console.log(document);
                res.json(document);
            }
        });
    }
    
});

router.get("/popularBooks", (req, res) =>{

    const today = new Date().toLocaleDateString()
    const dt = today.split('/')
    const month = dt[1]
    const year = dt[2]

    url = `https://www.goodreads.com/book/popular_by_date/${year}/${month}`
    book_list = []
    books_added = false

    request(url, (error, response, html) =>{
        if(error)
            console.log(error)
        else{
            const $ = cheerio.load(html)
            $('.BookListItem').each((i, el) =>{

                const link = $(el).find('.BookCover').attr('href')
                const title = $(el).find('.Text.H2.Text--text-body').text().replace(/\s\s+/g, '')
                const author = $(el).find('.ContributorLink__name').text()
                const rating = $(el).find('.BookListItemRating__column.BookListItemRating__column--secondary').children().first().text()
                const descp = $(el).find('.TruncatedText__text.TruncatedText__text--3').find('.Formatted').text()
                const img = $(el).find('img').attr('src')

                bookInfo = {
                    Title: title,
                    Author: author,
                    Link: link,
                    Rating: rating,
                    Description: descp,
                    Img: img
                }

                book_list.push(bookInfo)


            })
            books_added = true
            console.log('Scraping Done')
        }
    })
    function wait(){
        if (books_added === false){
            setTimeout(wait, 50)
            return
        }
        res.status(200).json({PopularBooks: book_list})
    }
    wait()
});

router.post('/question', (req, res) =>{
    const context = req.body.context
    const question = req.body.question

    const process = spawn('python', ['./pyanswer.py', context, question]) 
    process.stdout.on('data', data =>{
        const answer = data.toString()
        console.log(answer)
        res.status(200).json({ans: answer})

    })

})

router.put("/text", (req, res) =>{
    const bookName = req.body.bookName

    const newPage = {
        'id': parseInt(req.body.id),
        'content': req.body.content
    } 

    if (!newPage.id || !newPage.content || !bookName){
        return res.status(400).json({msg: "Please enter Book Name, Id and content"});
    }

    const query = {
        BookName: bookName,
    }
    const updateField = { 
        $push: {
            pages: newPage
        }
    }

    db.getDB().collection(db.collection).findOneAndUpdate(query, updateField, {returnOriginal: false, upsert: true}, (err, result) =>{
        if(err){
            console.log(err);
            return res.status(400).json({
                msg: "Error occured while inserting Data",
                error: err
            });
        }   
        else{
            res.status(200).json({
                msg: `Page text added in collection ${db.collection} and Book ${bookName}`,
            });
        }
    })
});

router.put("/content", (req, res) => {
    const id  = parseInt(req.body.id)
    const bookName = req.body.bookName
    
    if (!id || !req.body.summary || !req.body.mcq || !req.body.fib || !req.body.oneW || !bookName){
        return res.status(400).json({msg: "Please enter bookname, Id and content"});
    }

    const query = {
        BookName: bookName,
        'pages.id': id
    }
    const updateField = { 
        $set: {
            'pages.$.summary': req.body.summary, 
            'pages.$.fib': req.body.fib, 
            'pages.$.mcq': req.body.mcq,
            'pages.$.oneW': req.body.oneW
        }
    }

    db.getDB().collection(db.collection).findOneAndUpdate(query, updateField, {returnOriginal: false, upsert: true}, (err, result) =>{
        if(err){
            console.log(err);
            return res.status(400).json({
                msg: "Error occured while inserting Data",
                error: err
            });
        }   
        else{
            res.status(200).json({
                msg: `Page Content is added in collection ${db.collection} and Book ${bookName}`,
            });
        }
    })
})


module.exports = router