import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
        name: name,
        link: link,
    })
  }

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

return (
  <PopupWithForm
    title = "Новое место"
    name = "addProfile"
    buttonText = "Создать"
    isOpen = {isOpen}
    onClose = {onClose}
    handleSubmit={handleSubmit}>
      <label htmlFor="title-input" className="popup__label"> 
        <input type="text" className="popup__input popup__input_string_title" id="title-input" placeholder="Название" name="title" minLength="2" maxLength="30" required onChange={handleChangeName} value={name}/> 
        <span className="popup__error" id="title-input-error"></span> 
      </label> 
      <label htmlFor="link-input" className="popup__label"> 
        <input type="url" className="popup__input popup__input_string_link" id="link-input" placeholder="Ссылка на фотографию" name="link" required onChange={handleChangeLink} value={link} /> 
        <span className="popup__error" id="link-input-error"></span> 
      </label> 
  </PopupWithForm>
  )
}