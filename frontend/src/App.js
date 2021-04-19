import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import { getAllAdvice } from './store/actions/postActions';
import Dashboard from './pages/Dashboard';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAdvice());
  });
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard}></Route>
        <Route path="/dashboard/:userName" component={Dashboard}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
