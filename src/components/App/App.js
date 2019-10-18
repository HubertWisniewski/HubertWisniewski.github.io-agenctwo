import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";
import firebase from 'firebase'
import './App.css';

const beginAt = Date.now()
var lastBaloonTime = beginAt;
const baloonDTime = 800 

class App extends Component {
state = {
  user: null,
  baloons: []
};


componentDidMount() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase
        .database()
        .ref("users/" + user.uid)
        .once("value")
        .then(snapshot => {
          let fetchedUser = { uid: user.uid, ...(snapshot.val() || {}) };
          this.setState({ user: fetchedUser });
        });
    }
  });
  this.update();
}

handleClick = event => {
  firebase.auth().signOut()
}

createBaloon = () => {

    
  const baloon = document.createElement('div', {className: 'baloon'})
  baloon.classList.add('baloon')
  baloon.onclick = () => {baloon.remove()}
  baloon.speed = Math.ceil(Math.random() * 3)
  baloon.style.left = Math.floor(Math.random() * 100) - 10 + 'vw'; 
  this.state.baloons.push(baloon);
  if (document.getElementById('App')) {
    document.getElementById("App").appendChild(baloon)
  }
  
  

}

update = () => {
  var now = Date.now()

  if (now - lastBaloonTime > baloonDTime) {
    this.createBaloon()
  lastBaloonTime = now
}

this.state.baloons.forEach(function (baloon) {
  var bottom = parseFloat(window.getComputedStyle(baloon).bottom);
  // var left = parseFloat(window.getComputedStyle(baloon).left);

  bottom += baloon.speed;
      if (bottom >= 570) {
        baloon.remove()
      }
      

      baloon.style.bottom = bottom + 'px';
})

requestAnimationFrame(this.update);
}
 

render() {
   return (
    <div id="App">
      <header className="App-header">
        <h1>
          Cześć {this.state.user ? this.state.user.name : '' }!
        </h1>
        <h1>
          Zanim Duda zadzwoni możesz sobie poklikać w balony :v
        </h1>
      </header>
      <Button className="Uciekam" onClick={this.handleClick}>Uciekam</Button>
    </div>
  );
 }
}

export default withRouter(App);
