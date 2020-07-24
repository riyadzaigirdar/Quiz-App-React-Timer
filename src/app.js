import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from './Component/Home/Home'
import Quiz from './Component/Quiz/Quiz'
import Exam from './Component/Exam/exam'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'><Home /></Route>
                    <Route path='/quiz'><Quiz /></Route>
                    <Route path='/exam/:id'><Exam /></Route>
                </Switch>
            </Router>
        )
    }
}

export default App