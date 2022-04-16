import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete' : 'element__delete_hidden'}`
  ); 

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`; 

  function handleClick() {
      props.onCardClick(props.card);
    }  

  function handleLikeClick() {
      props.onCardLike(props.card)
  }

  function handleCardDelete() {
      props.onCardDelete(props.card)
  }

  return (
    <div className="elements-template"> 
      <li className="element"> 
        <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/> 
        <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}></button> 
          <div className="element__group"> 
            <h2 className="element__text">{props.card.name}</h2> 
            <div className="element__heart"> 
              <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button> 
              <p className="element__amount">{props.card.likes.length}</p> 
          </div> 
        </div> 
      </li> 
    </div>
  )
}

export default Card;