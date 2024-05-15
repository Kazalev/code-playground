import Image from 'next/image'

type ButtonProps = {
    type: 'button' | 'submit'
    value: string
    icon?: string
    alt?: string
    variant: 'btn_dark_green' | 'btn_green' | 'btn_white_text' | 'btn_white' | 'btn_dark_green_outline'
    full?: boolean
}

const Button = ({ type, value, icon, alt, variant, full }: ButtonProps) => {
    return (
        <button type={type} className={`flexCenter gap-3 rounded-full border ${variant} ${full && 'w-full'}`}>
            {icon && <Image src={icon} alt={alt || value} width={24} height={24} />}
            <label className='bold-16 whitespace-nowrap cursor-pointer'>{value}</label>
        </button>
    )
}

export default Button
