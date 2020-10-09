import React, {Component} from 'react';
import * as firebase from "firebase/app"
import "firebase/database"
import config from "./firebase-config";

export default class TrendingPosts extends Component {

constructor(){
    super();
    this.state = {
        testing: false,
        posts : {},
        topPosts: {}
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
     } 
}

componentDidMount() {
    const postsRef = firebase.database().ref().child('data/posts/');
    let _this = this;
    postsRef.on('value', function(snapshot) {
        _this.setState({
        testing: true,
        posts: snapshot.val(),
        });
        });
 }
 
componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.posts !== prevState.posts) {
            this.findTopPosts();
        }
 }

findTopPosts(){
    if (isEmpty(this.state.posts)) { 
        return
    }

    let dict = this.state.posts;
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]["quibs"]];
   });
 
   items.sort(function(first, second) {
     return second[1] - first[1];
   });
 
   items = (items.slice(0, 5));
   let newDict = {};
   let posts = this.state.posts;
  
   for (let i = 0; i < items.length; i++) {
       if (items[0][0] === null)
       break
       else {
        newDict[items[i][0]] = posts[items[i][0]]
       }     
   }

   this.setState(Object.assign(this.state.topPosts,newDict));

 }

 
render() {
if (isEmpty(this.state.posts)) {
 return <p style={{fontFamily: 'Helvetica'}}> Loading the hot 5...</p>
    }

else {
return <div> <h1 style={{
    color: 'rgb(241, 159, 76)',
    textAlign: 'center',
    fontFamily: 'Helvetica'}}> 
    <img src={require('./fire.gif')} className='fire' style={{ paddingRight: 10}}/> 
     TRENDING   
    <img src={require('./fire.gif')} className='fire' style={{ paddingLeft: 10}}/>
    </h1> <Posts p={this.state.topPosts}> 
</Posts> </div>
    }
}
};

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  function handleClick(key, dict, event) {
    event.preventDefault();
    let firebaseRef = firebase.database().ref('data/posts/' + key)
    firebaseRef.set({
        quibs: dict[key]["quibs"] + 1, 
        body: dict[key]["body"], 
        title: dict[key]["title"],
        timestamp: dict[key]["timestamp"]});
    }

  function Posts(props) {
    return Object.keys(props.p).map(function(key){
     let title = props.p[key]["title"]
     let body = props.p[key]["body"]
     let quibs = props.p[key]["quibs"]
     let time = new Date(props.p[key]["timestamp"])
        return <div className='boxWrapper'>
        <div className='box' style={{ fontFamily: 'Helvetica'}}>
        <div className='dateFormat2'> {(time.toLocaleDateString())} </div>
        <div className='dateFormat'> {(time.toLocaleTimeString())} </div>
        <h3> {title} </h3>

        <p style={{ padding: 25, marginRight: 10, marginLeft: 10 }}> {body}  </p>

        
    <h4 style={{fontSize: 19}} > 
    <img style={{ paddingRight: 5}}src={require('./megaphone.png')} className='quib'/> {quibs} <button className='btn1'
        onClick ={ (e) => handleClick(key, props.p, e)}
        style={{padding: 4, marginLeft:20 }}> 
        Quib This! </button>
    </h4>
        </div>
        </div>
 });
 }