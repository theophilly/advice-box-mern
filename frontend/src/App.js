import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import { getAllAdvice } from './store/actions/postActions';
import Dashboard from './pages/Dashboard';
import { login } from './store/actions/authActions';
import { ON_LOGIN_SUCCESS } from './store/actionTypes/authActionsTypes';
import About from './pages/About';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getUser();
    dispatch(getAllAdvice());
  });

  const getUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const token = localStorage.getItem('token');
      dispatch({
        type: ON_LOGIN_SUCCESS,
        payload: {
          user: JSON.parse(user),
          token,
        },
      });
    }
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/about" exact component={About}></Route>
        <Route path="/dashboard/:userName" component={Dashboard}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
