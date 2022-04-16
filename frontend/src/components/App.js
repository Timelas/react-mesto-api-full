import '../index.css';
import React from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import accept from "../images/Accept.svg";
import reject from "../images/Reject.svg";


function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCards] = React.useState({isOpen: false});
  const [currentUser , setCurrentUser] = React.useState({_id: null, avatar: ''});
  const [cards, setCards] = React.useState([]);
  const [isToooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState({ pathImage: "", text: "" });
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (loggedIn) {
    api
      .getInitialCards()
      .then(cardList => {
        setCards(cardList)
      })
      .catch((err) => {
      console.log(err)
    })
  }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
    api.getUserInfo()
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  function handleEditAvatarClick () {
      setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick () {
      setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick () {
      setIsAddPlacePopupOpen(true)
  }

  function handleCardClick({name, link, isOpen}) {
      setSelectedCards({name, link, isOpen: !isOpen})
  }

  function closeAllPopups() {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCards({isOpen: false});
      setIsTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item)=> item === currentUser._id);
    api.changeLike(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    })
    .catch((err) => {
      console.log(err)});
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
        setCards((state) => state.filter((element) => element !== card));
    })
    .catch((err) => {
      console.log(err)});
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
}, [])

function handleUpdateUser({name, about}) {
  api.editProfile(name, about)
  .then(() => {
      const updateUser = {...currentUser};
      updateUser.name = name;
      updateUser.about = about;
      setCurrentUser({...updateUser})
      closeAllPopups();
  })
  .catch((err) =>{
      console.log(err)
  })
  }

  function handleUpdateAvatar({avatar}) {
    api.editAvatar(avatar)
    .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
    })
    .catch((err) => {
        console.log(err)
    })
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addNewCard(name, link)

    .then((data) => {
        setCards([data, ...cards])
        closeAllPopups()
    })
    .catch((err) => {
        console.log(err)
    })
  }

  function handleSignOut() {
    setCurrentUser({_id: null, avatar: ''})
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    api.updateHeaders();
    setEmail("");
    history.push("/sign-in");
  }

  function handleToolltipInfoOpen() {
    setIsTooltipOpen(true);
  }

  function registration({ email, password }) {
    auth.register(email, password)
      .then((res) => {
          handleTooltipInfo({
            pathImage: accept,
            text: "Вы успешно зарегестрировались!",
          });
          handleToolltipInfoOpen();
          history.push("/sign-in");
      })
      .catch((err) => {
        handleTooltipInfo({
          pathImage: reject,
          text: "Что - то пошло не так! Попробуйте еще раз.",
        });
        handleToolltipInfoOpen();
        console.log(err);
      });
  }

  function authorization({ email, password }) {
    auth.authorize({email, password})
      .then((data) => {
        if (!data) {
          return;
        }
        setLoggedIn(true);
        setEmail(email)
        handleTooltipInfo({
          pathImage: accept,
          text: "Вы успешно авторизированы!",
        });
        history.push("/");
        handleToolltipInfoOpen();
      })
      .catch((err) => {
        handleTooltipInfo({
          pathImage: reject,
          text: "Что - то пошло не так! Попробуйте еще раз.",
        });
        handleToolltipInfoOpen();

        console.log(err);
      });
  }

  function handleTooltipInfo({pathImage, text}) {
    setMessage({pathImage, text});
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header
          handleSignOut={handleSignOut}
          loggedIn={loggedIn}
          email={email} />
      <Switch>
        <Route path="/sign-in">
          <Login authorization={authorization} />
        </Route>
        <Route path="/sign-up">
          <Register registration={registration} />
        </Route>
        <ProtectedRoute exact path="/main"
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          loggedIn={loggedIn} />
        <Route path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} />
      <PopupWithForm
        title="Вы уверены?"
        name="removeCard"
        buttonText="Да"
        onClose={closeAllPopups} />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isToooltipOpen}
        onClose={closeAllPopups}
        message={message} />
    </div>
  </CurrentUserContext.Provider>
);}

export default App;
