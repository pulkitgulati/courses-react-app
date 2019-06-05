import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import Select from "react-select";
import { options } from "../config/options";
import "../config/i18n";
import { withNamespaces } from "react-i18next";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: options[0]
    };
  }

  changeLang = lang => {
    const { i18n } = this.props;
    const { value } = lang;
    this.setState({
      lang
    });
    i18n.changeLanguage(value);
  };

  render() {
    const { lang } = this.state;
    //const { t } = this.props;

    return (
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={PageNotFound} />
        </Switch>
        <br />
        <Select
          defaultValue={options[0]}
          options={options}
          value={lang}
          onChange={this.changeLang}
          className="App-Select"
        />
      </div>
    );
  }
}

export default withNamespaces("translations")(App);
