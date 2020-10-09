import React, { Component } from 'react';
import * as firebase from "firebase/app"
import "firebase/database"
import config from "./firebase-config";
import './post.css'

class AddPost extends Component {
  constructor() {
    super();

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
     } 
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    title: '',
    body: '',
    displayErrors: false  
  };

  handleTitleChange = (text) => {
    this.setState({
      title: text.target.value,
    });
  }

  handleBodyChange = (text) => {
      this.setState({
          body: text.target.value
      })
  }


  handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
        this.setState({
            displayErrors: true}
        )
            return;
    }

   writeNewPost(this.state.title, this.state.body);
   alert("Thanks for your Quibble!");
   this.setState( {
       title: "",
       body: "",
   }
   )
  }

  render() {

    return (
      <div className="boxWrapper">
        <h1 style={{ fontFamily: 'Helvetica', color: 'peru'}}> What's your Quibble? </h1>
             <div className="AddPost">
            <input
                 type="text"
                 placeholder="Write the title of your post"
                style={{fontSize: 16, width: 500, padding: 10}}
                onChange={ this.handleTitleChange}
                value= {this.state.title} />
            </div>
        <div> 
          <textarea type= "text" className='submitbody' 
            placeholder="Write the body of your post" 
            onChange={this.handleBodyChange} 
            value={this.state.body} 
            />
        </div>
        <button
          className='btn2'
          type="submit"
          onClick={this.handleSubmit}
        >
          Submit your Quibble!
        </button>
    </div>
    );
  }
};


function writeNewPost(title, body) {

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('data/posts/').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updateTitle = {};
    var updateBody = {};
    var updateQuibs = {};
    var updateTime = {};
    
    var currentDate = new Date();
    var dateString = currentDate.toUTCString();

    updateBody['data/posts/' + newPostKey + '/body'] = body
    updateTitle['data/posts/' + newPostKey + '/title' ] = title
    updateQuibs['data/posts/' + newPostKey + '/quibs'] = 0;
    updateTime['data/posts/' + newPostKey + '/timestamp'] = dateString

    firebase.database().ref().update(updateTitle);
    firebase.database().ref().update(updateBody);
    firebase.database().ref().update(updateQuibs);
    firebase.database().ref().update(updateTime)
  }


export default AddPost;