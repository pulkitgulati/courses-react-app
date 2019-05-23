import React from "react";
import { Link } from "react-router-dom";
//import "../../node_modules/bootstrap/dist/css/bootstrap.css";

const HomePage = () => (
  <div className="jumbotron">
    <h1>Courses Administration</h1>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </div>
);

export default HomePage;
