import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false},
  { "src": "/img/potion-1.png", matched: false},
  { "src": "/img/ring-1.png", matched: false},
  { "src": "/img/scroll-1.png", matched: false},
  { "src": "/img/shield-1.png", matched: false},
  { "src": "/img/sword-1.png", matched: false} 
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabaled, setDisabaled] = useState(false)
  const [gameWon, setGameWon] = useState(false)
 
  // use effect one to compare 2 selected cards
  useEffect(() => {
    
    if(choiceOne && choiceTwo) {
      setDisabaled(true);
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card;
            }
          })
        })
        resetItems()
      } else {
        setTimeout(() => {
          resetItems()
        }, 1000)
      }
    }

    const allMatched = cards.every((card) => card.matched);

    if (allMatched && cards.length > 0) { // Only trigger if there are cards on the board
      // Show the "Congrats" alert and set the game as won
      alert("Congrats! You've matched all the cards.");
      setGameWon(true);
    }

  }, [choiceOne, choiceTwo, cards])

  // use effect to show the cards automatically
  useEffect(() => {
    shuffleCards();
  }, [])

  const resetItems = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabaled(false)
  }

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id : Math.floor(Math.random() * 100)}))

    setCards(shuffled)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card) => {
          return (
            <SingleCard 
              key={card.id} 
              card={card} 
              handleChoice={handleChoice}
              flipped = {card === choiceOne || card === choiceTwo || card.matched}
              disabaled = {disabaled}
            />
          )
        })}
      </div>
      <p style={{textAlign: 'center'}}>Turns: {turns}</p>
    </div>
  );
}

export default App;
