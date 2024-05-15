import { component$, useSignal, useStore, useStylesScoped$ } from '@builder.io/qwik'
import ContactStyles from './contact.css?inline'

export default component$(() => {
    useStylesScoped$(ContactStyles)

    const formVisible = useSignal(false)
    const formState = useStore({ name: '', message: '' })

    return (
        <article>
            <h2>Contact</h2>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas aut ex, quam ipsa nisi nobis ut quidem mollitia odit, culpa sed? Tenetur possimus
                cum excepturi corrupti ducimus eos nisi incidunt.
            </p>

            <button onClick$={() => (formVisible.value = !formVisible.value)}>Contact Me</button>

            {formVisible.value && (
                <form
                    preventdefault:submit
                    onSubmit$={() => {
                        console.log(formState.name, formState.message)
                        formState.name = ''
                        formState.message = ''
                    }}
                >
                    <label>
                        <span>Your name:</span>
                        <input type='text' onInput$={(e) => (formState.name = (e.target as HTMLInputElement).value)} value={formState.name} />
                    </label>
                    <label>
                        <span>Your message:</span>
                        <textarea onInput$={(e) => (formState.message = (e.target as HTMLInputElement).value)} value={formState.message}></textarea>
                    </label>
                    <button>Send</button>

                    <p>{formState.name}</p>
                    <p>{formState.message}</p>
                </form>
            )}
        </article>
    )
})
