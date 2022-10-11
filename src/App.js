import './App.css'
import React from 'react';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';


const cardImages = [
  {"src": "/imgNotes/C3.png", matched: false, sound: ("/musicNotes/C3.mp3")},
  {"src": "/imgNotes/D3.png", matched: false, sound: ("/musicNotes/D3.mp3")},
  {"src": "/imgNotes/E3.png", matched: false, sound: ("/musicNotes/E3.mp3")},
  {"src": "/imgNotes/F3.png", matched: false, sound: ("/musicNotes/F3.mp3")},
  {"src": "/imgNotes/G3.png", matched: false, sound: ("/musicNotes/G3.mp3")},
  {"src": "/imgNotes/A3.png", matched: false, sound: ("/musicNotes/A3.mp3")},
  {"src": "/imgNotes/B3.png", matched: false, sound: ("/musicNotes/B3.mp3")},
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiseOne, setChoiseOne] = useState(null)
  const [choiseTwo, setChoiseTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle Cards //Start new game
   const shuffleCards = () => {
      const shuffledCards = [...cardImages,...cardImages]  //duplicate cards
        .sort(()=> Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() })) //adding id to each item
        
  setChoiseOne(null)
  setChoiseTwo(null)  
   setCards(shuffledCards)
   setTurns(0)
  }
  
  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card) 
    
   }

  //compare 2 selected cards
  useEffect(()=> {

     if(choiseOne && choiseTwo) {
        setDisabled(true)
        
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
            setTimeout(()=> resetTurns(), 1000)
          }
      }
  }, [choiseOne, choiseTwo])
  
  console.log(cards);
  

  //reset choises & increase turns
  const resetTurns = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }


  //start new game automaticly 
  useEffect( ()=> {
    shuffleCards()
  }, [])

  return (
    <div className="App">
        <h1>Music Match</h1>
        <button onClick = {shuffleCards}> New Game </button>
        
        <div className="card-grid">
          {cards.map(card => ( 
            <SingleCard 
               key={card.id}
               card={card} 
               handleChoise = {handleChoise}
               flipped={card === choiseOne || card === choiseTwo || card.matched}
               disabled = {disabled}
             />
          ))}
        </div>
        <p> Number of turns: {turns}</p>
    </div>
  );
}

export default App;