

import React, {Component} from 'react';
import * as firebase from "firebase/app"
import "firebase/database"
import config from "./firebase-config";
import './stylesheet.css'


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      posts : {},
      search : ''
    }
  
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
   } 
    
  
  }
  render() {
    return (
      <div style={{ 
        fontFamily: 'Helvetica',
      }}>
      <h1 style={{
        color: 'peru',
        textAlign: 'center'}}> Quibbles
        </h1>
        <div>
          <input className="searchBar" type="text" placeholder="search by title" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
        </div>
        <Posts p={this.state.posts} query={this.state.search}/>   
        </div>
    );
    }

  
  updateSearch(event){
    this.setState({
      search : event.target.value.substr(0, 20)
    })
  }
  
  componentDidMount() {
    const postsRef = firebase.database().ref().child('data/posts/');
    let _this = this;
    postsRef.on('value', function(snapshot) {
        _this.setState({
        posts: snapshot.val(),
        });
        });
      }
  };


 function handleClick(key, p, event) {
  event.preventDefault();
 
  let firebaseRef = firebase.database().ref('data/posts/' + key)
 
  firebaseRef.set( {
    quibs: p[key]["quibs"] + 1, 
    body: p[key]["body"],
    title: p[key]["title"], 
    timestamp: p[key]["timestamp"]});
    
  }
 
  function Posts(props) {
          const {query, p} = props
          const normalizedQuery = query.toLowerCase()
          const array = Object.entries(p)
          const filteredPosts = array.filter(item => {
          const [key, value] = item
          const title = value['title']
          const normalizedTitle = title.toLowerCase()
        return normalizedTitle.includes(normalizedQuery)
      })

      if (filteredPosts.length === 0){
        return <p> No results found.</p>
      }
  return filteredPosts.map(key => 
      {
        console.log("the key: " + key)
        console.log("yeah check this out" + key)
        let postInfo = key[1]
        let title = postInfo["title"]
        let body = postInfo["body"]
        let time = new Date(postInfo["timestamp"])
        let quibs = postInfo["quibs"]
    return <div className='boxWrapper'>
             <div className='box'>
               <div className='dateFormat2'> {(time.toLocaleDateString())} </div>
                <div className='dateFormat'> {(time.toLocaleTimeString())} </div>
                   <h3> {title} </h3>
                   <p style={{ padding: 25, marginRight: 10, marginLeft: 10 }}> {body}  </p>  
                  <h4 style={{fontSize: 19}} > 
                 <img style={{ paddingRight: 5}}src={require('./megaphone.png')} className='quib'/> {quibs}
                  <button className='btn1'
                  onClick ={ (e) => handleClick(key[0], p, e)}
                  style={{padding: 4, marginLeft:20 }}> 
                  Quib This! </button>
         </h4>
      </div>
   </div>
    });
    }

