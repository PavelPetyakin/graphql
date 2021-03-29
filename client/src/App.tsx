import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AboutPage, AuthPage, HomePage } from "pages";

import "./App.css";

export function App() {
  return (
    <Router>
      <Route path='/' exact={true} component={HomePage} />
      <Route path='/about' component={AboutPage} />
      <Route path='/auth' component={AuthPage} />
    </Router>
  );
}
