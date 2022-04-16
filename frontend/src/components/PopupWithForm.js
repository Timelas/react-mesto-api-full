import React from 'react'

function PopupWithForm(props) {
    return (
      <div className={`popup popup-${props.name} && ${props.isOpen && 'popup_open'}`}> 
      <div className="popup__container"> 
        <button className="popup__close" type="button" onClick={props.onClose}></button> 
        <h3 className="popup__title">{props.title}</h3> 
        <form action="#" className={`popup__form popup__${props.name}`} name={`${props.name}`} method="POST" onSubmit={props.handleSubmit}> 
          {props.children}
          <button className="popup__button" type="submit">{props.buttonText}</button> 
      </form> 
      </div> 
    </div> 
    )
}


export default PopupWithForm;