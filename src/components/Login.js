import React, {useEffect} from 'react';
import {useHistory, Link, withRouter} from 'react-router-dom';
import cardAuth from '../cardAuth';


function Login () {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setMessage('');
  }

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    cardAuth.getContent(jwt)
    .then((res)=> {
      setEmail(res.data.email);
      //set logged in to true
    })
    .then(resetForm)
          .then(() => {
            history.push('/users/me')
          })
    .catch(err => setMessage(err.message))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!password || !email) {
      return  setMessage("You did not enter a password or email!")
    }
          cardAuth.authorize(email, password)
          .then((res)=> {
            if (!res || res.statusCode === 400) {
              throw new Error('One of the fields was filled in incorrectly')
            }
          return res;
          })
          .then(() => {
            checkToken()
          })
          .then(resetForm)
          .then(() => {
            history.push('/users/me')
          })
          .catch(err => setMessage(err.message))
      }

      useEffect(() => {
        if(localStorage.getItem('jwt')) {
          history.push('/users/me') //make sure to build this route
        }
      })
  
//this is NOT DONE and none of the css is written!!!
  return (

      <form className="register__container login__container" onSubmit={handleSubmit}>

<h2 className="register__title">Sign In</h2>

<input className="register__email form__input" type="email" id="email" name="email" minLength="2" maxLength="40" defaultValue="Email" onChange={(e) => setEmail(e.target.value)} required />


      <input className="register__password form__input" type="text" id="password" name="password" defaultValue="Password" minLength="2" maxLength="20" onChange={(e) => setPassword(e.target.value)} required />


<button className= "register__save-button" type="submit" onClick={handleSubmit} >Sign In</button>
<Link to="/signup" className="register__button-text">Not a member yet? Sign up here!</Link>


</form>
    //</CurrentUserContext.Provider>
  );
}

export default withRouter(Login);


// 400 - one or more of the fields were not provided
//401 - the user with the specified email not found