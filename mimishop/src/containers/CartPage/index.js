import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, getCartItemsAction } from '../../actions';
import Layout from '../../components/Layout';
import { MaterialButton } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import Card from '../../components/UI/Card';
import CartItem from './CartItem';
import './style.css';

export default function CartPage(props) {
	const cart = useSelector((state) => state.cart);
	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const [ cartItems, setCartItems ] = useState(cart.cartItems);

	useEffect(
		() => {
			setCartItems(cart.cartItems);
		},
		[ cart.cartItems ]
	);

	useEffect(
		() => {
			if (auth.authenticate) {
				dispatch(getCartItemsAction());
			}
		},
		[ auth.authenticate ]
	);

	const onQuantityIncrement = (_id, qty) => {
		const { name, price, img } = cartItems[_id];
		dispatch(addToCartAction({ _id, name, price, img }, 1));
	};

	const onQuantityDecrement = (_id, qty) => {
		const { name, price, img } = cartItems[_id];
		dispatch(addToCartAction({ _id, name, price, img }, -1));
	};

	return (
		<Layout>
			<div className="cartContainer" style={{ alignItems: 'flex-start' }}>
				<Card
					headerLeft={`Mon Pannier`}
					headerRight={<div>Livraison à</div>}
					style={{ width: 'calc(100% - 400px)', overflow: 'hidden' }}
				>
					{Object.keys(cartItems).map((key, index) => (
						<CartItem
							key={index}
							cartItem={cartItems[key]}
							onQuantityInc={onQuantityIncrement}
							onQuantityDec={onQuantityDecrement}
						/>
					))}

					<div
						style={{
							width: '100%',
							display: 'flex',
							background: '#fff',
							justifyContent: 'flex-end',
							boxShadow: '0 0 10px 10px #eee',
							padding: '10px 20px',
							boxSizing: 'border-box'
						}}
					>
						<div
							style={{
								width: '250px'
							}}
						>
							<MaterialButton title="COMMANDER" onClick={() => props.history.push(`/checkout`)} />
						</div>
					</div>
				</Card>
				<PriceDetails
					totalItem={Object.keys(cart.cartItems).reduce(function(qty, key) {
						return qty + cart.cartItems[key].qty;
					}, 0)}
					subTotal={Object.keys(cart.cartItems).reduce((subTotal, key) => {
						const { price, qty } = cart.cartItems[key];
						return subTotal + price * qty;
					}, 0)}
					deliveryFee={120}
				/>
			</div>
		</Layout>
	);
}
