import { component$, Slot } from '@builder.io/qwik'

import Header from '~/components/header/header'

export default component$(() => {
    return (
        <>
            <Header />
            <p>THIS IS A TEST LAYOUT</p>
            <main>
                <section class='container'>
                    <Slot />
                </section>
            </main>
            <footer>
                <p>Copyright 2023 Mario Life.</p>
            </footer>
        </>
    )
})
