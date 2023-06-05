import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import dateData from "./routes/DateData";
import DateData from "./routes/DateData";


function App() {
  return <Router>
    <Switch>
      <Route path='/:date/:id'>
        <Detail/>
      </Route>
      <Route path='/:date'>
        <Home/>
      </Route>
      <Route path='/'>
        <DateData/>
      </Route>
    </Switch>
  </Router>
}

export default App;
