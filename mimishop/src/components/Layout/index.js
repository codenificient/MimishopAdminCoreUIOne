import React from 'react';
import Header from '../Header';
import MenuHeader from '../MenuHeader';
import './style.css';

export default function Layout(props) {
	return (
		<React.Fragment>
			<Header />
			<MenuHeader />

			{props.children}
		</React.Fragment>
	);
}
