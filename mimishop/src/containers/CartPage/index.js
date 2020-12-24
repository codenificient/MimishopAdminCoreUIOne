import React from 'react';
import Card from '../../components/UI/Card';
import './style.css';

export default function CartPage(props) {
	return (
		<div className="cartContainer">
			<Card headerLeft={`My Cart`} headerRight={<div>Deliver to</div>}>
				<div className="flexRow">
					<div className="cartProductContainer">
						<img src="" alt="" />
					</div>
					<div className="cartItemDetails">
						<div>Product Name</div>
						<div>Delivery in 3-5 days</div>
					</div>
				</div>
			</Card>
			<Card
				style={{
					width: '500px'
				}}
			>
				Price
			</Card>
		</div>
	);
}
