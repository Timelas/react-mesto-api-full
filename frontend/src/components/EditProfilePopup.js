import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

 function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
      setDescription(e.target.value)
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

return (
<PopupWithForm
title = "Редактировать профиль"
name = "editProfile"
buttonText = "Сохранить"
isOpen = {isOpen}
onClose = {onClose}
handleSubmit ={handleSubmit}>
    <label htmlFor="name-input" className="popup__label"> 
      <input type="text" className="popup__input popup__input_string_name" id="name-input" placeholder="Ваше имя" name="name" minLength="2" maxLength="40" required value={name || ""} onChange={handleNameChange} /> 
      <span className="popup__error" id="name-input-error"></span> 
    </label> 
    <label htmlFor="subheading-input" className="popup__label"> 
      <input type="text" className="popup__input popup__input_string_subheading" id="subheading-input" placeholder="Краткое описание профиля" name="about" minLength="2" maxLength="200" required value={description || ""} onChange={handleDescriptionChange} /> 
      <span className="popup__error" id="subheading-input-error"></span> 
    </label> 
</PopupWithForm>)
}

export default EditProfilePopup;