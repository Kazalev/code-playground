import { Button } from '@/components/ui/button'

export default function Home() {
    return (
        <>
            <h1 className='text-2xl'>Dashboard</h1>
            <Button variant='destructive' size='lg' className='text-blue-400'>
                Click me!
            </Button>
        </>
    )
}
