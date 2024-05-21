import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import HomeHeader from "./HomeHeader";
import "./Homepage.scss";
import About from "./Section/About";
import HandBook from "./Section/HandBook";
import MedicalSpecialty from "./Section/MedicalSpecialty";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import Specialty from "./Section/Specialty";
import HomeFooter from "./HomeFooter";
class Homepage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalSpecialty settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settings} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
