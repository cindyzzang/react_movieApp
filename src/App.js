import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import SetDailyDate from "./routes/SetDailyDate";
import DailyBoxOffice from "./routes/DailyBoxOffice";
import WeeklyBoxOffice from "./routes/WeeklyBoxOffice";
import SetWeeklyDate from "./routes/SetWeeklyDate";

function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/detail/:date/:id" component={Detail}/>
          <Route path="/daily" exact component={SetDailyDate} />
          <Route path="/daily/:date" component={DailyBoxOffice} />
          <Route path="/weekly" exact component={SetWeeklyDate} />
          <Route path="/weekly/:date" component={WeeklyBoxOffice} />
        </Switch>
      </Router>
  );
}

export default App;
