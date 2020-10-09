import React from "react"
import logo from "./containers/App/logo.png";
import App from './containers/App/index.js'
import './containers/App/stylesheet.css'
import AddPost from "./containers/App/addpost";
import TrendingPosts from './containers/App/trending';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  }
   from "react-router-dom";

const Routes = (props) => (
      <Router>
        <div className='headerWrapper'>
          <ul style={{
            backgroundColor: 'darksalmon',
            padding: 20,

          }}>
            <li className='header' >
              <Link className='headerLink' to="/">Home</Link>
            </li>
            <li className='header'>
              <Link  className='headerLink' to="/about">About</Link>
            </li>
            <li className='header'>
              <Link  className='headerLink' to="/dashboard">Dashboard</Link>
            </li>
            <li className='header'> <Link className='headerLink' to='/trending'> Trending </Link></li>
            <li className='header'>
                <Link  className='headerLink' to="/new-post"> Add a Quibble! </Link>
            </li>

          </ul>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/dashboard" component={App}> 
            </Route>
            <Route path= "/new-post" component={AddPost}>
            </Route>
            <Route path= '/trending' component ={TrendingPosts}>
            </Route>
          </Switch>
        </div>
      </Router>
    );



  function Header() {
    return <img src={logo} alt="Logo" />;
  }

function Home() {
    return (
      <div>
        <div style={{
          display:'flex', 
          justifyContent:'center', 
          paddingTop: 30 
          }}
          ><Header></Header>
        </div>
        <div style={{
          display:'flex', 
          justifyContent:'center',  
          fontFamily: 'Helvetica', 
          color: 'darksalmon',
          fontSize: 27 
          }}>
            <h2>Welcome to Quibble!</h2>
          </div>
        
        <div style=
        {{display:'flex', 
        justifyContent:'center', 
        fontFamily: 'Helvetica',
        fontSize: 20,
         }}>
          <p> Rant, rave, report, and riot!</p>
        </div>
        <a href="/new-post"> <button className='btn3'> What's your Quibble? </button> </a>
      </div>
    );
  }
  
  function About() {
    return (
      <div className="pageWrapper">
      <div className="page" style={{color: 'peru'}}>
        <h1>About</h1>
        <p> Quibble is a site that allows its users to speak their mind however they choose!
            In an era of never ending outrage; we provide an outlet. 
            <p>Politics, video games, sports, movies, or even ancedotes about your day - feel 
            free to discuss whatever you'd like with no filter. Got a rude customer today at work? 
            Maybe an unpopular view about a certain beloved film? Or perhaps you just really dislike
            how your microwaved leftovers tasted today and want the world to know. Quibble is your oyster. </p>
            
            <p> Free speech is our mission; if you have something to say, say it! If you agree, Quib it!</p>
        </p>
        <h2> <Link className='aboutLink' to="/new-post"> So, what's your quibble? </Link></h2> 
        
      </div>
      </div>
    );
  }


export default Routes