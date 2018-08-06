import React, { Component } from "react";
import {addToHomeScreen} from "../functions/functions";

export class InstallBanner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"installBanner"}>
        <div className={"bannerText"}>
          Add This App to your home screen
        </div>
        <button className={"bannerAction"} onClick={addToHomeScreen}>Add to Home Screen</button>
      </div>
    );
  }
}

