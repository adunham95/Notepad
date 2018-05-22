import React, { Component } from 'react';
import './App.css';
import {NotePad, ShoppingList} from "./components/notepad";


class App extends Component {
  render() {
    return (
      <div className="App">
          <NotePad/>
      </div>
    );
  }
}

export default App;
