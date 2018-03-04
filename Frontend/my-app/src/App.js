import React, { Component } from 'react';
import Toolbar from "./Toolbar"
import PageBody from "./PageBody"

class App extends Component {
  render() {
    return (
      <div>
        <Toolbar/>
        <PageBody/>
      </div>
    );
  }
}

export default App;
