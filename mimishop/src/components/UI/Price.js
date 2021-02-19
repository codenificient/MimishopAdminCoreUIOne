import React from 'react';
import { formatter } from '../../urlConfig';

const Price = (props) => {
	return (
		<div className="productPrice"
			style={{
				fontSize: props.fontSize ? props.fontSize : '14px',
				fontWeight: 'bold',
				margin: '5px 0'
			}}
		>
			{props.title && props.title + ':  '} 
			{ formatter.format(props.value) }
		</div>
	);
};

export default Price;
