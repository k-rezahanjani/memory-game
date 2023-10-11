import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabaled}) {

    const handleClick = () => {
        if(!disabaled) {
            handleChoice(card)
        }
    }
    return (
        <div className='card '>
            <div className={flipped ? 'flipped' : ''}>
                <img 
                    className='front'
                    src={card.src} 
                    alt='card front'
                />
                <img 
                    className='back' 
                    src="img/cover.png" 
                    alt='card back'
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}