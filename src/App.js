import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import { BottomNav } from "./components/Nav/Nav";
import { firstRun } from "./components/functions/functions";
import NotePage from "./components/Notepage/notepage";
import { ProjectPage } from "./components/Projectpage/projectpage";
import { InstallBanner } from "./components/installBanner/installBanner";

class App extends Component {
  componentDidMount() {
    firstRun();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <InstallBanner />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/note/:id" component={NotePage} />
            <Route path="/project/:id" component={ProjectPage} />
          </Switch>
          <BottomNav />
        </div>
      </Router>
    );
  }
}

export default App;
