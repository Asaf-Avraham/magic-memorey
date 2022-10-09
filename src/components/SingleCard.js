import './SingleCard.css'
import React from 'react';

export default function SingleCard ({ card, handleChoise, flipped, disabled }) {
   
   const handleClick = () => {
      if (!disabled) {
         handleChoise(card)
      }
   }
   
   //if flipped is true then we styling the flipped class
   return( 
        <div className="card">
          <div className = {flipped ? "flipped" : ""}>  
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
