import React from "react";
import helpers from './utils/ajaxHelpers';

const App = React.createClass({

  console.log("Spaces: ", axios.getSpaces());

  render() {
    return(
      <div>
        <h3>Hello from React!</h3>
      </div>
    )
  }
});

export default App;
