import { Resource, component$, useSignal, useStore } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { routeLoader$ } from '@builder.io/qwik-city'

interface BlogData {
    id: string
    title: string
    content: string
}

// export const onGet = routeLoader$(async () => {
//     console.log('fetching blogs')

//     const res = await fetch('http://localhost:3000/api/blogs')
//     const data = await res.json()

//     return data as BlogData[]
// })

export default component$(() => {
    // const blogsData = onGet()

    const name = useSignal('Mario')
    const person = useStore({ name: 'Peach', age: 30 })
    // const blogs = useStore([
    //     { id: 1, title: 'Mario is the best', author: 'Mario' },
    //     { id: 2, title: 'Mario is the worst', author: 'Bowser' },
    //     { id: 3, title: 'My first blog', author: 'Mario' },
    //     { id: 4, title: 'My second blog', author: 'Bowser' }
    // ])

    return (
        <div>
            <h2>Okie Dokie</h2>

            {/* <Resource
                value={blogsData}
                onPending={() => <div>Loading...</div>}
                onResolved={(blogs: BlogData[]) => (
                    <div class='blogs'>
                        {blogs &&
                            blogs.map((blog) => (
                                <div key={blog.id}>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.content.slice(0, 50)}...</p>
                                </div>
                            ))}
                    </div>
                )}
            /> */}

            <p>Hello, {name.value}</p>
            <p>
                Hello, {person.name} - {person.age} years old
            </p>

            <button onClick$={() => (name.value = 'Kris')}>Click Me</button>
            <button onClick$={() => (person.name = 'Ivan')}>Click Me Again</button>

            {/* <button onClick$={() => blogs.pop()}>Remove a blog</button> */}
        </div>
    )
})

export const head: DocumentHead = {
    title: 'Mario Life',
    meta: [
        {
            name: 'description',
            content: 'A blog site about everything Mario'
        }
    ],
    links: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' }]
}
