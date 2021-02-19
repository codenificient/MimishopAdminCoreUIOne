import React from 'react';
import { IoIosCart } from 'react-icons/io';

const Cart = (props) => {
	return (
		<div style={{ fontSize: '21px', position: 'relative' }}>
			<span
				style={{
					position: 'absolute',
					background: 'red',
					width: '20px',
					height: '20px',
					borderRadius: '6px',
					fontSize: '13px',
					border: '1px solid #fff',
					textAlign: 'center',
					alignSelf: 'center',
					top: '-15px',
					right: '-6px'
				}}
			>
				{props.count}
			</span>
			<IoIosCart />
		</div>
	);
};

export default Cart;
