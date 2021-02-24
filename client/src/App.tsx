import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AboutPage, HomePage } from "pages";

import "./App.css";

export function App() {
  return (
    <Router>
      <Route path='/' exact={true} component={HomePage} />
      <Route path='/about' component={AboutPage} />
    </Router>
  );
}
