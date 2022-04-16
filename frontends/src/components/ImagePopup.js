import React from 'react';

function ImagePopup(props) {

  return (
      <div className={`popup popup-image ${props.card.isOpen && 'popup_open'}`}> 
        <div className="popup__visual"> 
          <button className="popup__close popup__close-image" type="button" aria-label="Закрыть попап" onClick={props.onClose}></button> 
          <div className="popup__box"> 
            <img  className="popup__photo" src={props.card.link} alt={props.card.name} /> 
            <h3 className="popup__subtitle">{props.card.name}</h3> 
          </div> 
        </div> 
      </div>
  );
}

export default ImagePopup; 