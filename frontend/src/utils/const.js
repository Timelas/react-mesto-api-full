export {
  validationConfig,
  openPopupEditProfileButton,
  openPopupAddCardButton,
  formElementSave,
  nameInput,
  jobInput,
  formElementAdd,
  elementsListSelector,
  popupImageSelector,
  photoPopupSelector,
  subtitlePopupSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  profileNameSelector,
  profileDescriptionSelector,
  deletePopupSelector,
  popupAvatarSelector,
  profileAvatarInput,
  formAvatar,
  editAvatarButton,
  avatarSelector
}

const popupImageSelector = '.popup-image';
const photoPopupSelector = '.popup__photo';
const subtitlePopupSelector = '.popup__subtitle';
const elementsListSelector = '.elements__list';
const openPopupEditProfileButton = document.querySelector('.profile__edit-button');
const profileNameSelector = '.profile__name';
const profileDescriptionSelector = '.profile__description';
const popupEditProfile = document.querySelector('.popup-edit');
const popupEditProfileSelector = '.popup-edit';
const openPopupAddCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add');
const popupAddCardSelector = '.popup-add';
const formElementSave = popupEditProfile.querySelector('.popup__save');
const nameInput = formElementSave.querySelector('.popup__input_string_name');
const jobInput = formElementSave.querySelector('.popup__input_string_subheading');
const formElementAdd = popupAddCard.querySelector('.popup__create');

const deletePopupSelector = '.popup-delete-card';
const popupAvatar = document.querySelector('.popup-avatar');
const popupAvatarSelector = '.popup-avatar';
const profileAvatarInput = popupAvatar.querySelector('.popup__input_string_link-avatar');
const formAvatar = popupAvatar.querySelector('.popup__avatar');
const editAvatarButton = document.querySelector('.profile__avatar-edit');
const avatarSelector = '.profile__avatar';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  popupOpen: '.popup_open'
};
