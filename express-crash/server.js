const express = require('express')
const path = require('path')
const port = process.env.PORT || 4000

const app = express()

// Setup static folder
app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'about.html'))
// })

let posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
    { id: 4, title: 'Post 4' },
    { id: 5, title: 'Post 5' }
]

// Get all posts
app.get('/api/posts', (req, res) => {
    const limit = parseInt(req.query.limit)
    if (!isNaN(limit) && limit > 0) return res.status(200).json(posts.slice(0, limit))
    res.status(200).json(posts)
})

// Get single post
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id)
    if (!post) return res.status(404).json({ msg: `Post with id ${id} not found` })
    res.status(200).json(post)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
