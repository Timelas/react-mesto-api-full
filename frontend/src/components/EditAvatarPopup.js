import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputAvatar = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatar.current.value
    });
  } 

return (
  <PopupWithForm
    title ="Обновить Аватар"
    name = "avatarlink"
    buttonText = "Сохранить"
    isOpen = {isOpen}
    onClose = {onClose}
    handleSubmit={handleSubmit}>
      <label htmlFor="link-input" className="popup__label"> 
        <input type="url" className="popup__input popup__input_string_link-avatar" id="link-input-avatar" placeholder="Ссылка на аватар" name="link" required ref={inputAvatar}/> 
        <span className="popup__error" id="link-input-avatar-error"></span> 
      </label> 
  </PopupWithForm>
  )
}