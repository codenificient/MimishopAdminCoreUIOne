import React from 'react';
import Header from '../Header';
import './style.css';

export default function Layout(props) {
	return (
		<React.Fragment>
			{props.children}
		</React.Fragment>
	);
}
