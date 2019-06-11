import React, { Component, Suspense } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react'
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import '../config/i18n'

export class App extends Component {
  
  render() {
    let data = localStorage.getItem('persist:root') && JSON.parse(JSON.parse(localStorage.getItem('persist:root')).langOptionsReducer).option.value;
    console.log(data)
    console.log(this.props)
    this.props.props.changeLanguage(data)

    return (
      < Provider
        store={store} >
        {/* https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md */}
        < PersistGate
          loading={<div>loading app...</div>}
          // onBeforeLift={onBeforeLift}
          persistor={persistor} >
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      </PersistGate >
      </Provider >
    );
  }
}

export default App;
