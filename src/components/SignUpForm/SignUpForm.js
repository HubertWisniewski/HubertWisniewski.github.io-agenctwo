import React, { Component } from 'react';
import firebase from 'firebase'
import { Input, Button } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";
import './SignUpForm.css'

class SignUpForm extends Component {
    state = {
        email: "",
        password: "",
        name: "",
        error: null
      };
    
      handleSubmit = event => { 
        event.preventDefault();
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(data => {
            firebase.database().ref("users/" + data.user.uid).set({
              name: this.state.name
            });
          }).catch(error => this.setState({ error })) 
    
      };
    
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

  render() {
    return (
      <div className="SignUp">
        <form onSubmit={this.handleSubmit} className="SignUpForm">
          {this.state.error && <p>{this.state.error.message}</p>}
          <Input
            className='Text'
            placeholder="Enter email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required={true}
          />
          <Input
            className='Text'
            placeholder="Enter password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required={true}
          />
          <Input
            className='Text'
            placeholder="Enter name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Button>Sign up</Button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
