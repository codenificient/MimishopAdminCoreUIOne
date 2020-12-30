import { cartConstants } from '../actions/constants';

const initState = {
	cartItems: {},
	updatingCart: false,
	error: null
};

export default (state = initState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		// eslint-disable-next-line
		case cartConstants.ADD_TO_CART_REQUEST:
			state = {
				...state,
				updatingCart: true
			};
			break;
		case cartConstants.ADD_TO_CART_SUCCESS:
			state = {
				...state,
				updatingCart: false,
				cartItems: action.payload.cartItems
			};
			break;
		case cartConstants.ADD_TO_CART_FAILURE:
			state = {
				...state,
				updatingCart: false,
				error: action.payload.error
			};
			break;

		case cartConstants.RESET_CART:
			state = {
				...initState
			};
			break;
	}
	return state;
};
