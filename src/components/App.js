import React from "react";
import { Route, BrowserRouter, Switch, withRouter, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "./Register.js";
import Login from "./Login.js";
import Header from "./Header";
import Main from "./Main";
import { api } from "../utils/api.js";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm.js";
import InfoToolTip from "./InfoToolTip.js";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import * as cardAuth from '.././cardAuth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }
  function handleCardClick(card) {
    setIsImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(card);
  }

  function handleProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleUpdateUser(name, about, ...rest) {
    api
      .setUserInfo([name, about, currentUser.avatar])
      .then(() =>
        setCurrentUser({
          name: name,
          about: about,
          avatar: currentUser.avatar,
        })
      )
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then(() =>
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar: avatar,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }
//trouble with state of infotooltip
  function handleLoginStatus() {
    console.log("infotooltipopen", isInfoToolTipOpen)
    setLoggedIn(!loggedIn); //might need to modify this if used in multiple places
    setIsInfoToolTipOpen(true);
    console.log("infotooltipopen after reset", isInfoToolTipOpen)
  }

  function handleLogout() {
    setLoggedIn(!loggedIn);
    console.log("handleLogout", loggedIn)
    localStorage.setItem('jwt', "")
  }

  //CARD section stats here

  const [cards, setCards] = React.useState([]);

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked)

      .then((newCard) => {
        // Create a new array based on the existing one and putting a new card into it
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Update the state
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    // check if the card has been deleted? not sure there is an analog to the isliked above...

    //send api request
    api
      .removeCard(card._id)
      .then((remainingCard) => {
        //console.log(remainingCard);
        const remainingCards = cards.filter((item) => item._id !== card._id);
        setCards(remainingCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const resetForm = () => {
    setEmail("");
    setMessage("");
  };

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    cardAuth
      .getContent(jwt)
      .then((res) => {
        setEmail(res.data.email);
        handleLoginStatus();
        console.log("loggedin, infotooltip", loggedIn, isInfoToolTipOpen)
      })
      .then(resetForm)
      .then(() => {
        history.push("/users/me");
      })
      .catch((err) => {setMessage(err.message);
      console.log(message);})
  };

  const handleLogin = (email, password) => {
    
    if (!password || !email) {
      return setMessage("You did not enter a password or email!");
    }
    cardAuth
      .authorize(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error("One of the fields was filled in incorrectly");
        }
        return res;
      })
      .then(() => {
        checkToken();
      })
      .then(resetForm)
      .then(() => {
        history.push("/users/me");
      })
      .catch((err) => setMessage(err.message));
  };

  React.useEffect(() => {
    api
      .getCardList()
      .then((res) => setCards(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //infotooltip Props might be off at this point
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <BrowserRouter>
          <Switch>
            <Route path="/signup">
              <Header link="/signin" navText="login" />
              <Register handleLogin={handleLogin} />
            </Route>
            <Route path="/signin">
              <Header link="signup" navText="register" />
              <Login handleLogin={handleLogin} />
            </Route>
            <Route>
              <Header
                link="/signin"
                navText="Log Out"
                email={currentUser.email}
                handleLogout = {handleLogout}
              />
            </Route>
            <ProtectedRoute
              path="/users/me"
              loggedIn={loggedIn}
              onEditProfile={handleProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick} //might have issue here - used twice...
              selectedCard={selectedCard}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onUpdateUser={handleUpdateUser}
              handleEditAvatarClick={handleEditAvatarClick}
              onClose={closeAllPopups}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onUpdateAvatar={handleUpdateAvatar}
              onClose={closeAllPopups}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onAddPlace={handleAddPlaceSubmit}
              onClose={closeAllPopups}
            />
            <PopupWithForm
              name="delete-card"
              title="Are you sure?"
              submitButtonName="card-delete-confirm"
            />
            <ImagePopup
              isOpened={isImagePopupOpen}
              image=""
              title="Image Caption"
              card={selectedCard}
              onClick={handleCardClick}
            />

            <InfoToolTip isOpened={isInfoToolTipOpen} isValid={loggedIn} />
            <Footer />
          </Switch>
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App); // withRouter(App); Liza did this in video
