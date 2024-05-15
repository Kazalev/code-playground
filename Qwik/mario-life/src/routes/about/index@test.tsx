import { component$, useSignal, useStyles$, $ } from '@builder.io/qwik'
import AboutStyles from './about.css?inline'
import Modal from '~/components/modal/modal'

export default component$(() => {
    useStyles$(AboutStyles)
    const modalVisible = useSignal(false)

    // Convert it as QRL
    const closeModal = $(() => {
        modalVisible.value = false
    })

    return (
        <article>
            <h2 onClick$={() => console.log('About clicked!!!')}>About</h2>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas aut ex, quam ipsa nisi nobis ut quidem mollitia odit, culpa sed? Tenetur possimus
                cum excepturi corrupti ducimus eos nisi incidunt.
            </p>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas aut ex, quam ipsa nisi nobis ut quidem mollitia odit, culpa sed? Tenetur possimus
                cum excepturi corrupti ducimus eos nisi incidunt.
            </p>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas aut ex, quam ipsa nisi nobis ut quidem mollitia odit, culpa sed? Tenetur possimus
                cum excepturi corrupti ducimus eos nisi incidunt.
            </p>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas aut ex, quam ipsa nisi nobis ut quidem mollitia odit, culpa sed? Tenetur possimus
                cum excepturi corrupti ducimus eos nisi incidunt.
            </p>

            <button
                onClick$={() => {
                    modalVisible.value = !modalVisible.value
                }}
            >
                Open Modal
            </button>

            {modalVisible.value && (
                <Modal size='lg' frosted close={closeModal}>
                    <div q:slot='content'>
                        <h2>Great News!</h2>
                    </div>
                    <div q:slot='footer'>
                        <button>Sign up now!</button>
                    </div>
                </Modal>
            )}
        </article>
    )
})
