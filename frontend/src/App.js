import React from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import Room from './routes/Room';
import Game from './routes/Game';

function App() {
  return (
    <Router>
      <div>
      <Switch>
        <Route exact path="/" component={Home}>
        </Route>
        <Route path="/room/:roomID" component={Room}>
        </Route>
        <Route path="/game/:mod" component={Game}>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
