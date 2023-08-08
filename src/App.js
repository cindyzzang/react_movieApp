import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import GlobalStyles from "./styles/GlobalStyles";
import "../src/styles/App.css"

function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
        <GlobalStyles/>
          <Header/>
          <div className={"content_box"}>
              <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/:date/:id" component={Detail}/>
              </Switch>
          </div>

      </Router>
  );
}

export default App;
