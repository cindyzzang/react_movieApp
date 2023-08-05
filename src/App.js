import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import SetDailyDate from "./routes/SetDailyDate";
import BoxOffice from "./components/BoxOffice";
import Login from "./components/Login";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
        <GlobalStyles/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/detail/:id" component={Detail}/>

        </Switch>
      </Router>
  );
}

export default App;
