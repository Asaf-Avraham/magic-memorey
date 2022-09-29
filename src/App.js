import './App.css'
import React from 'react';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';


const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiseOne, setChoiseOne] = useState(null)
  const [choiseTwo, setChoiseTwo] = useState(null)


  //shuffle Cards //Start new game
   const shuffleCards = () => {
      const shuffledCards = [...cardImages,...cardImages]  //duplicate cards
        .sort(()=> Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() })) //adding id to each item
      
   setCards(shuffledCards)
   setTurns(0)
  }

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card)  
  
  }
 
  //compare 2 selected cards
  useEffect(()=> {
     if(choiseOne && choiseTwo) {
      
        if(choiseOne.src === choiseTwo.src){   // if there's a match
            setCards(prevCards => {           // prevCards is previous cards array
              return prevCards.map(card => {
                if(card.src === choiseOne.src){ // if there's a match
                  return { ...card, matched: true }     //return true to the matched property
                }else{
                  return card
                }
              })
            })
            
            resetTurns() 
      
        } else {
            resetTurns()
          }
      }
  }, [choiseOne, choiseTwo])
  
  console.log(cards);
  

  //reset choises & increase turns
  const resetTurns = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prevTurns => prevTurns +1)
  }

  return (
    <div className="App">
        <h1>Magic Match</h1>
        <button onClick = {shuffleCards}> New Game </button>
        
        <div className="card-grid">
          {cards.map(card => ( 
            <SingleCard 
               key={card.id}
               card={card} 
               handleChoise = {handleChoise}
               flipped={card === choiseOne || card === choiseTwo || card.matched}
             />
          ))}
        </div>

       

    </div>
  );
}

export default App;