import React from 'react';
import editButton from '../images/edit-button.png';
import buttonPlus from '../images/+.svg';
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  const {onEditAvatar, onAddPlace, onEditProfile, onCardClick, cards, onCardLike, onCardDelete} = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <> 
    <section className="profile"> 
      <div className="profile__information"> 
        <div className="profile__container"> 
          <img src={`${currentUser.avatar}`} alt="Аватар" className="profile__avatar" /> 
          <button className="profile__avatar-edit" onClick={onEditAvatar}></button> 
        </div> 
        <div className="profile__info"> 
          <h1 className="profile__name">{currentUser.name}</h1> 
          <button className="profile__edit-button" type="button" onClick={onEditProfile}><img src={editButton} alt="редактировать" className="profile__image-button" aria-label="Редактировать профиль" /></button> 
          <p className="profile__description">{currentUser.about}</p> 
        </div> 
      </div> 
     <button className="profile__add-button" type="button" onClick={onAddPlace}> <img src={buttonPlus} alt="добавить" className="profile__plus" aria-label="Добавить карточку" /></button> 
    </section> 
    <section className="elements"> 
      <ul className="elements__list">
      {cards.map(card => (
        <Card 
        key={card._id} 
        card={card} 
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete} />
        ))}
      </ul> 
    </section> 
  </> 
  );
}

export default Main; 