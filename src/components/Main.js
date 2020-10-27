import React from 'react';
//import Header from './Header.js';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile section-width">

        <div className="profile__section">

          <div className="avatar">
            <img className="profile__avatar" alt="My avatar" onClick={props.onEditAvatar} src={currentUser.avatar} />
            <img className="hover_type_edit" src="images/EditAvatarIcon.png" alt="edit icon" />
          </div>
          <div className="profile__info">

            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button hover" onClick={props.onEditProfile}></button>
            <p className="profile__description">{currentUser.about}</p>

          </div>

        </div>

        <button className="profile__add-button hover" onClick={props.onAddPlace}></button>

      </section>

      <section className="section-width">

        <ul className="elements">
          {
            props.cards.map((card, i) =>
              <Card
                key={i}
                name={card.name}
                image={card.link}
                likes={card.likes}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                _id = {card._id}
                owner = {card.owner}
              />)
          }
        </ul>

      </section>
    </main>

  );

}

export default Main;