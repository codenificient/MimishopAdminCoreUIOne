import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store';

WebFont.load({
	google: {
		families: [ 'Poppins:600,700', 'sans-serif', 'Oswald:600' ]
	}
});

window.store = store;

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
