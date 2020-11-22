  
import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import Register from './pages/Register';
import LogIn from './pages/LogIn';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
          <Route path="/register" component={Register} />
          <Route path="/log-In" component={LogIn} />
        </Switch>
      </Router>
    </>
  );
}

export default App;