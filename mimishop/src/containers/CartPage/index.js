import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, clearCartAction, getCartItemsAction } from '../../actions';
import Layout from '../../components/Layout';
import { Breed, MaterialButton } from '../../components/MaterialUI';
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

	const onQuantityUpdate = (_id, qty) => {
		const { name, price, img } = cartItems[_id];
		dispatch(addToCartAction(_id, name, price, img), qty);
	};

	const clearCart = () => {
		dispatch(clearCartAction());
	};

	if (props.onlyCartItems) {
		return (
			<React.Fragment>
				{Object.keys(cartItems).map((key, index) => (
					<CartItem
						key={index}
						cartItem={cartItems[key]}
						onQuantityInc={onQuantityIncrement}
						onQuantityDec={onQuantityDecrement}
						onQuantityUp={onQuantityUpdate}
					/>
				))}
			</React.Fragment>
		);
	}

	return (
		<Layout>
			<Breed
				breed={[
					{
						name: 'Accueil',
						href: '/'
					},
					{
						name: 'Mon Pannier',
						href: '/cart/'
					}
				]}
				breedIcon={<IoIosArrowForward />}
			/>
			<div className="cartContainer" style={{ alignItems: 'flex-start' }}>
				<Card headerLeft={`Mon Pannier`} style={{ width: 'calc(100% - 400px)', overflow: 'hidden' }}>
					{Object.keys(cartItems).map((key, index) => (
						<CartItem
							key={index}
							cartItem={cartItems[key]}
							onQuantityInc={onQuantityIncrement}
							onQuantityDec={onQuantityDecrement}
							style={{ fontWeight: 'normal' }}
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
							className="flexRow textCenter"
							style={{
								width: '100%'
							}}
						>
							<MaterialButton title="PAYER" onClick={() => props.history.push(`/checkout`)} />
							<MaterialButton title="RETOURNER" onClick={() => props.history.goBack()} />
							<MaterialButton title="VIDER PANNIER" onClick={clearCart} />
						</div>
					</div>
				</Card>

				<PriceDetails
					totalItem={Object.keys(cartItems).reduce(function(qty, key) {
						return qty + cartItems[key].qty;
					}, 0)}
					subTotal={Object.keys(cartItems).reduce((subTotal, key) => {
						const { price, qty } = cartItems[key];
						return subTotal + price * qty;
					}, 0)}
					delivery={Object.keys(cartItems).reduce((delivery, key) => {
						let { deliveryFee, qty } = cartItems[key];
						if (!deliveryFee) {
							deliveryFee = 0;
						}
						return delivery + deliveryFee * qty;
					}, 0)}
				/>
			</div>
		</Layout>
	);
}
