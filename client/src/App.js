import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, PhotographerProfile } from "./components";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/home" component={Home} />
				<Route
					exact
					path="/photographer/:id/"
					component={PhotographerProfile}
				/>
			</Switch>
		</Router>
	);
}

export default App;
