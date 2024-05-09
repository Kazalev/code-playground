const output = document.getElementById('output')
const button = document.getElementById('fetchPosts')
const form = document.getElementById('add-post-form')

async function fetchPosts() {
    try {
        const res = await fetch('http://localhost:8000/api/posts')

        if (!res.ok) throw new Error('Faild to fetch posts')

        const posts = await res.json()
        output.innerHTML = ''

        posts.forEach((post) => {
            const postEl = document.createElement('div')
            postEl.textContent = post.title
            output.appendChild(postEl)
        })
    } catch (error) {
        console.error('Error fetching posts', error)
    }
}

// Submit new post
async function addPost(e) {
    e.preventDefault()
    const formData = new FormData(this)
    const title = formData.get('title')

    try {
        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        })

        if (!res.ok) throw new Error('Failed to submit post')

        const newPost = await res.json()
        const postEl = document.createElement('div')
        postEl.textContent = newPost.title
        output.appendChild(postEl)
        fetchPosts()
    } catch (error) {
        console.error('Error submitting post', error)
    }
}

// Event listener
button.addEventListener('click', fetchPosts)
form.addEventListener('submit', addPost)
