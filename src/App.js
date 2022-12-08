import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignUp from './Components/SignUp';
import TwitterApp from "./Components/TwitterApp";
import Github from "./Components/Github";
import History from "./Components/History";

function App() {


    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Switch>
                        <Route exact path='/'>
                            <Navbar/>
                            <Home/>
                        </Route>

                        <Route path="/SearchTwitter">
                            <Navbar/>
                            <TwitterApp/>
                        </Route>

                        <Route exact path="/signup">
                            <SignUp/>
                        </Route>

                        <Route exact path="/github">
                            <Navbar/>
                            <Github/>
                        </Route>

                        <Route exact path="/history">
                            <Navbar/>
                            <History/>
                        </Route>


                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
