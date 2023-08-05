import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import SetDailyDate from "./routes/SetDailyDate";
import BoxOffice from "./routes/BoxOffice";
import SetWeeklyDate from "./routes/SetWeeklyDate";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
        <GlobalStyles/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/boxoffice" component={BoxOffice} />
          <Route path="/boxoffice/detail/:id" component={Detail}/>

        </Switch>
      </Router>
  );
}

export default App;
