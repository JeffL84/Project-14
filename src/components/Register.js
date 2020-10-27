import React, {useEffect} from 'react';
import {useHistory, Link, withRouter} from 'react-router-dom';
import * as cardAuth from '../cardAuth.js';
//import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
//import { api } from '../utils/api.js';

function Register () {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setMessage('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!password || !email) {
      return  setMessage("You did not enter a password or email!")
    }
          cardAuth.register(email, password)
          .then((res)=> {
            if (!res || res.statusCode === 400) {
              throw new Error('One of the fields was filled in incorrectly')
            }
          return res;
          })
          .then(resetForm)
          .then(() => {
            history.push('/signin')
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
    //<CurrentUserContext.Provider value={currentUser}>
    <section className = "register">
      <form className="register__container" onSubmit={handleSubmit}>

<h2 className="register__title">Sign Up</h2>

<input className="register__email register__input" type="email" id="email" name="email" minLength="2" maxLength="40" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />


      <input className="register__password register__input" type="password" id="password" name="password" placeholder="Password" minLength="2" maxLength="20" onChange={(e) => setPassword(e.target.value)} required />


<button className= "register__save-button" type="submit" onClick={handleSubmit} >Sign Up</button>
<Link to='/signin' className="register__button-text">Already a member? Login here.</Link>


</form>
</section>
    //</CurrentUserContext.Provider>
  );
}

export default withRouter(Register);