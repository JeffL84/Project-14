import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';



function EditAvatarPopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [avatar, setAvatar] =React.useState();

  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();
  
    // Pass the values of the managed components to the external handler
    props.onUpdateAvatar({
      avatar: avatar
    });
  }

  return (
    
    <PopupWithForm name= "change-avatar" title= "Change profile picture" submitButtonName= "avatar-confirm" isOpened = {props.isOpen} onClick = {props.handleEditAvatarClick}>
    <input className = "form__description form__description-card form__input" type = "url" id = "urlAvatar" name = "url" placeholder = "Image link" required/>
    <span id ="urlAvatar-error" className = "form__input-error"></span>
</PopupWithForm>

  );

}

export default EditAvatarPopup;