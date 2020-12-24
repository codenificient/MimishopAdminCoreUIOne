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
				{props.label}
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
					}}
					onBlur={(e) => {
						if (e.target.value === '') {
							setFocus(false);
						}
					}}
				/>
				{props.rightElement ? props.rightElement : null}
			</div>
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
				width: props.width,
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
				{props.title && props.title}
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
									href={item.href}
									onClick={(e) => {
										e.preventDefault();
										item.onClick && item.onClick();
									}}
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

export { Modal, MaterialInput, MaterialButton, DropdownMenu };
