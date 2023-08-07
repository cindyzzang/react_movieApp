import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import BoxOffice from "./components/BoxOffice";
import Login from "./components/Login";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
        <GlobalStyles/>
          <Header/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/:date/:id" component={Detail}/>
        </Switch>
      </Router>
  );
}

export default App;
