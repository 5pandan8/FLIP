const request = require('request')
const cheerio = require('cheerio')

url = 'https://www.goodreads.com/book/popular_by_date/2021'
book_lst_ready = false
book_list = []
img_lst = []
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

            bookInfo = {
                Title: title,
                Author: author,
                Link: link,
                Rating: rating,
                Description: descp 
            }

            book_list.push(bookInfo)


        })
        //console.log(book_list)
        book_lst_ready = true
        console.log('Scraping Done')
    }
})

function wait_lst(){
    if (book_lst_ready === false){
        setTimeout(wait_lst, 50)
        return
    }
    book_list.forEach((book, i) =>{
        console.log(book)
        book_url = book.Link
        img_added = false
        request(book_url, (err, res, page) =>{
            if (err)
                console.log(err)
            else{
                const doc = cheerio.load(page)
                const img = doc('#coverImage').attr('src')
                img_lst.push(img)
                if (i === parseInt(book_list.length)){
                    img_added = true
                }
            }
        })
    })
    wait_img()
    console.log(book_list)
}

function wait_img(){
    if (img_added === false){
        setTimeout(wait_img, 50)
        return
    }
    book_list.forEach((book, i) =>{
        book.Img =img_lst[i]
    })
}

wait_lst()


