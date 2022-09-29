import './SingleCard.css'
import React from 'react';

export default function SingleCard ({ card, handleChoise, flipped }) {
   
   const handleClick = () => {
      handleChoise(card)
   }
   
   return( 
        <div className="card">
          <div className = {flipped? "flipped" : ""}>
             <img className="front" src={card.src} alt="card front" />
             <img 
                className="back"  
                src="img/cover.png" 
                onClick = {handleClick}
                alt="card back" 
              />
          </div>
       </div>
    )

}
