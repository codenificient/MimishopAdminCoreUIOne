import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isUserLoggedIn } from './actions';
import HomePage from './containers/HomePage';
import ProductDetailsPage from './containers/ProductDetailsPage';
import ProductListPage from './containers/ProductListPage';

function App() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	useEffect(
		() => {
			if (!auth.authenticate) {
				dispatch(isUserLoggedIn());
			}
		},
		[ auth.authenticate ]
	);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
					<Route path="/:slug" component={ProductListPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
