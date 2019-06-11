import React, { Component } from "react";
import { Link } from "react-router-dom";
//import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
import { options } from "../../config/options";
import "../../config/i18n";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { changeLang } from "../../actions/langOptions";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log("inside constructor");
    this.state = {
      lang: options[0]
    };
  }

  changeLang = lang => {
    const { i18n } = this.props;
    const { value } = lang;
    this.props.changeLang(lang);
    this.setState({ lang });
    i18n.changeLanguage(value);
  };

  componentWillReceiveProps(props) {
    console.log(props);
  }

  componentDidMount() {
    this.setState({
      lang: this.props.option.value ? this.props.option : options[0]
    });
    // this.props.i18n.changeLanguage(options[2].value);
  }

  render() {
    const { lang } = this.state;
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

const mapStateToProps = state => {
  return {
    option: state.langOptionsReducer.option
  };
};

export default connect(
  mapStateToProps,
  { changeLang }
)(withTranslation("translations")(HomePage));
