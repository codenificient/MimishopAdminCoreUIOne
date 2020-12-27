import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction } from '../../actions';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import CartItem from './CartItem';
import './style.css';

export default function CartPage(props) {
	const cart = useSelector((state) => state.cart);

	const dispatch = useDispatch();

	const [ cartItems, setCartItems ] = useState(cart.cartItems);

	useEffect(
		() => {
			setCartItems(cart.cartItems);
		},
		[ cart.cartItems ]
	);

	const onQuantityIncrement = (_id, qty) => {
		const { name, price, img } = cartItems[_id];
		dispatch(addToCartAction({ _id, name, price, img, qty }));
	};

	const onQuantityDecrement = (_id, qty) => {
		const { name, price, img } = cartItems[_id];
		dispatch(addToCartAction({ _id, name, price, img, qty }));
	};

	return (
		<Layout>
			<div className="cartContainer">
				<Card headerLeft={`My Cart`} headerRight={<div>Deliver to</div>}>
					{Object.keys(cartItems).map((key, index) => (
						<CartItem
							key={index}
							cartItem={cartItems[key]}
							onQuantityInc={onQuantityIncrement}
							onQuantityDec={onQuantityDecrement}
						/>
					))}
				</Card>
				<Card
					style={{
						width: '500px'
					}}
				>
					Price
				</Card>
			</div>
		</Layout>
	);
}
