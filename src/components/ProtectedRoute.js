import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './Header';

const ProtectedRoute = ({ component: Component, ...props}) => {
  return (
  <Route> 
    {
    () => props.loggedIn ? 
    <>
    <Header email={props.email} link ="/signin" navText = "Log Out" handleLogout = {props.handleLogout} />
    <Component {...props} /> 
    </>
    : 
    <Redirect to = '/signin' />
  }
  </Route>
  )
}

export default ProtectedRoute;