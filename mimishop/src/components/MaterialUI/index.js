import React, { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import './style.css';

/**
* @author Rizwan Khan
* @function 
**/

const Modal = (props) => {
	if (!props.visible) {
		return null;
	}
	return (
		<React.Fragment>
			<div className="modalFixedBg">
				<div style={{ position: 'relative' }}>
					<div className="modalClose" onClick={props.onClose}>
						<IoMdCloseCircle />
					</div>
					<div className="modalContainer">{props.children}</div>
				</div>
			</div>
		</React.Fragment>
	);
};

const MaterialInput = (props) => {
	const [ focus, setFocus ] = useState(false);
	const [ touch, setTouch ] = useState(false);

	return (
		<div className="materialInput">
			<label
				className={`label ${focus ? 'focus' : ''}`}
				style={{
					top: 0,
					lineHeight: 'none',
					...props.style
				}}
			>
				{props.label && `Entrer ${props.label}`}
			</label>
			<div
				style={{
					display: 'flex'
				}}
			>
				<input
					className="input"
					type={props.type}
					value={props.value}
					onChange={props.onChange}
					onFocus={(e) => {
						setFocus(true);
						setTouch(true)
					}}
					onBlur={(e) => {
						if (e.target.value === '') {
							setFocus(false);
						} else {
							setTouch(false)
						}
					}}
				/>
				{props.rightElement ? props.rightElement : null}
			</div>
			{
				touch && <div style={{ fontSize: '12px', color: 'red', fontWeight: '500'}}>{`${props.label} est réquis`}</div>
			}
		</div>
	);
};

const MaterialButton = (props) => {
	const onClick = () => {
		props.onClick && props.onClick();
	};

	return (
		<div
			style={{
				width: '90%',
				margin: '1rem',
				...props.style
			}}
		>
			<button
				className="materialButton"
				style={{
					background: props.bgColor,
					color: props.textColor
				}}
				onClick={onClick}
			>
				{props.icon && props.icon} &nbsp;&nbsp;
				{props.title && props.title} &nbsp;&nbsp;
				{props.icon1 && props.icon1}
			</button>
		</div>
	);
};

const DropdownMenu = (props) => {
	return (
		<div className="headerDropdownContainer">
			{props.menu}
			<div className="dropdown">
				<div className="upArrow" />
				{props.firstMenu}
				<ul className="headerDropdownMenu">
					{props.menus &&
						props.menus.map((item, index) => (
							<li key={index}>
								<a
									onClick={(e) => {
										if (item.onClick) {
											e.preventDefault();
											item.onClick && item.onClick();
										}
									}}
									href={`${item.href}`}
								>
									{item.label}
								</a>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

const Anchor = (props) => {
	return (
		<button {...props} className="anchorButton">
			{props.name}
		</button>
	);
};

const Breed = (props) => {
	return (
		<div className="breed">
			<ul>
				{props.breed &&
					props.breed.map((item, index) => (
						<li key={index}>
							<a href={item.href}>{item.name}</a>
							{props.breedIcon}
						</li>
					))}
			</ul>
		</div>
	);
};

export { Modal, MaterialInput, MaterialButton, DropdownMenu, Anchor, Breed };

