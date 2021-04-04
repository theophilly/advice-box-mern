import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import { getAllAdvice } from './store/actions/postActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAdvice());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
