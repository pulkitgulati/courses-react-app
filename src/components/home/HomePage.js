import React, { Component } from "react";
import { Link } from "react-router-dom";
//import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import { options } from "../../config/options";
import "../../config/i18n";
import { withTranslation } from "react-i18next";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log("inside constructor");
    //console.log(props);
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
    console.log("changeLang", lang);
    i18n.changeLanguage(value);
  };

  componentDidMount() {
    console.log("component did mount");
    if (this.props.i18n.language) {
      this.setState(
        {
          lang: options.filter(item => item.value === this.props.i18n.language)
        },
        () => console.log(this.state)
      );
    }
  }

  render() {
    const { lang } = this.state;
    console.log(this.state.lang);
    return (
      <React.Fragment>
        <div className="jumbotron">
          <h1>Courses Administration</h1>
          <Link to="about" className="btn btn-primary btn-lg">
            Learn more
          </Link>
        </div>
        <br />
        <div style={{ width: "200px" }}>
          <Select
            defaultValue={options[0]}
            options={options}
            value={lang}
            onChange={this.changeLang}
            className="App-Select"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation("translations")(HomePage);
