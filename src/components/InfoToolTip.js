import React from 'react';

function InfoToolTip(props) {

//make sure isValid prop is connected in a meaningful way!

  return (
    <div>
      <section className={props.isOpened ? `form form_type_${props.name} form_is-opened` : `form form_type_${props.name}`}>
        <div className="form__overlay"></div>
        <form className="form__container">

          <div className="form__content">

            <img className="form__image" src={props.isValid ? ".././images/success-icon.png" : ".././images/error-icon.png"} alt={props.isValid ? 'success' : 'error'} />
            {props.valid ? <p className="form__text">Success! You have now been registered.</p> : <p className="form__text">Oops, something went wrong! Please try again.</p>}

        </div>

          <button className="form__close-button hover" onClick={props.onClose}></button>

        </form>

      </section>
    </div>

  );

}

export default InfoToolTip;