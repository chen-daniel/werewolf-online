import React from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import Room from './routes/Room';

function App() {
  return (
    <Router>
      <div>
      <Switch>
        <Route exact path="/" component={Home}>
        </Route>
        <Route path="/room/:roomID" component={Room}>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
