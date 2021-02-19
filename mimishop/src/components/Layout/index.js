import React from 'react';
import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { scrollToTop } from '../../urlConfig';
import Header from '../Header';
import { MaterialButton } from '../MaterialUI';
import MenuHeader from '../MenuHeader';
import Card from '../UI/Card';
import './style.css';

export default function Layout(props) {
	

	return (
		<React.Fragment>
			<Header handleSearch={props.handleSearch} searchField={props.searchField} />
			<MenuHeader />

			{props.children}

			<div
				className="container"
				style={{
					marginTop: '100px',
					marginBottom: '240px'
				}}
			>
				<MaterialButton
					title="Naviguer en Haut"
					icon={<FaArrowUp />}
					onClick={scrollToTop}
					style={{
						width: '230px',
						border: 'none',
						float: 'right',
						overflow: 'hidden',
						fontSize: '15px'
					}}
				/>
			</div>
		</React.Fragment>
	);
}
