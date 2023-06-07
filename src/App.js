import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import DateData from "./routes/DateData";


function App() {
  return <Router>
    <Switch>
      <Route path={process.env.PUBLIC_URL +'/:date/:id'}>
        <Detail/>
      </Route>
      <Route path={process.env.PUBLIC_URL +'/:date'}>
        <Home/>
      </Route>
      <Route path={process.env.PUBLIC_URL +'/'}>
        <DateData/>
      </Route>
    </Switch>
  </Router>
}

export default App;
