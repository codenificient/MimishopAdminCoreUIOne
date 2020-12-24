import store from '../store';
import { cartConstants } from './constants';

export const addToCart = (product) => {
	return async (dispatch) => {
		const { cartItems } = store.getState().cart;
		dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
		try {
			// console.log('action::products', cartItems);
			const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + 1) : 1;
			cartItems[product._id] = {
				...product,
				qty
			};
			localStorage.setItem('cart', JSON.stringify(cartItems));
			dispatch({
				type: cartConstants.ADD_TO_CART_SUCCESS,
				payload: { cartItems }
			});
		} catch (error) {
			dispatch({
				type: cartConstants.ADD_TO_CART_FAILURE,
				payload: { error }
			});
		}
	};
};

export const updateCart = () => {
	return async (dispatch) => {
		const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;

		if (cartItems) {
			dispatch({
				type: cartConstants.ADD_TO_CART_SUCCESS,
				payload: { cartItems }
			});
		}
	};
};
