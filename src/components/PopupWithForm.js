import React from 'react';

function PopupWithForm(props) {

  return (
    <div>
      <section className={props.isOpened ? `form form_type_${props.name} form-with-button form_is-opened` : `form form_type_${props.name} form-with-button`}>
        <div className="form__overlay"></div>
        <form className="form__container" onSubmit={props.onSubmit}>

          <h2 className="form__title">{props.title}</h2>

          <div>{props.children}</div>

          <button className={`form__save-button form__${props.submitButtonName} hover hover_type_dark`} type="submit" onClick={props.onClose} >Save</button>
          <button className="form__close-button hover" onClick={props.onClose}></button>

        </form>

      </section>
    </div>

  );

}

export default PopupWithForm;
