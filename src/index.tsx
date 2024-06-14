import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Collection } from './pages/Collection';
import { CreateCard } from './pages/CreateCard';
import customTheme from './themes/customTheme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Player from './pages/Player';

const App = () => (
  <ThemeProvider theme={customTheme}>
    <Router>
      <Switch>
        <Route exact path="/collection" component={Collection} />
        <Route exact path="/create-card" component={CreateCard} />
        <Route exact path="/player/:playerId" component={Player} />
      </Switch>
    </Router>
  </ThemeProvider>
);

render(<App />, document.getElementById('root'));
