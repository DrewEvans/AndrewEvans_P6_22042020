import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, PhotographerProfile } from "./components";
import SimpleReactLightbox from "simple-react-lightbox";
import "./App.scss";

function App() {
	return (
		<SimpleReactLightbox>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route
						exact
						path="/photographers/:id/"
						component={PhotographerProfile}
					/>
				</Switch>
			</Router>
		</SimpleReactLightbox>
	);
}

export default App;
