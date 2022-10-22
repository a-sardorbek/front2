import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';

//pages
import login from './Pages/login/Login';
import Error from './Pages/404/Error';
import Main from './Pages/main/Main';

const App = () => {

  return (
    <Switch>
    <Redirect exact from='/' to='/login'/>
    <Route path='/login' component={login} exact/>
    <Route path='/tizimli' component={Main}/>
    <Route component={Error} />
  </Switch>  
  )
}

export default App