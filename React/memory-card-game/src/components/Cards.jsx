import { useState } from 'react'
import Card from './Card'

const dataArr = [
    { id: 1, img: '/img/html.png', stat: '' },
    { id: 2, img: '/img/css.png', stat: '' },
    { id: 3, img: '/img/js.png', stat: '' },
    { id: 4, img: '/img/scss.png', stat: '' },
    { id: 5, img: '/img/react.png', stat: '' },
    { id: 6, img: '/img/vue.png', stat: '' },
    { id: 7, img: '/img/angular.png', stat: '' },
    { id: 8, img: '/img/nodejs.png', stat: '' }
]

const doubledArr = [...dataArr, ...structuredClone(dataArr)]
const randomizedArr = doubledArr.sort(() => Math.random() - 0.5)

const Cards = () => {
    const [items, setItems] = useState(randomizedArr)
    const [firstSelected, setFirstSelected] = useState(null)

    const handleClick = id => {
        if (!firstSelected) {
            items[id].stat = 'active'
            setItems([...items])
            setFirstSelected(id)
        } else {
            check(id)
        }
    }

    const check = current => {
        if (items[current].id == items[firstSelected].id) {
            items[current].stat = 'correct'
            items[firstSelected].stat = 'correct'
            setItems([...items])
            setFirstSelected(null)
        } else {
            items[current].stat = 'wrong'
            items[firstSelected].stat = 'wrong'
            setItems([...items])

            setTimeout(() => {
                items[current].stat = ''
                items[firstSelected].stat = ''
                setItems([...items])
                setFirstSelected(null)
            }, 1000)
        }
    }

    return (
        <div className="container">
            {items.map((item, index) => (
                <Card key={index} item={item} id={index} handleClick={handleClick} />
            ))}
        </div>
    )
}

export default Cards
