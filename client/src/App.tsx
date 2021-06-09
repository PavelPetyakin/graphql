import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthPage, EditorPage, HomePage, PrintPage,SignupPage } from "pages";

export function App() {
  return (
    <Router>
      <Route path='/' exact={true} component={HomePage} />
      <Route path='/auth' component={AuthPage} />
      <Route path='/signup' component={SignupPage} />
      <Route path='/editor' component={EditorPage} />
      <Route path='/print' component={PrintPage} />
    </Router>
  );
}
