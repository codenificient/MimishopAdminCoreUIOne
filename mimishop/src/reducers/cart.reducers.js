import { cartConstants } from '../actions/constants';

const initState = {
	cartItems: [],
	loading: false,
	error: null
};

export default (state = initState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		// eslint-disable-next-line
		case cartConstants.ADD_TO_CART_REQUEST:
			state = {
				...state,
				loading: true
			};
			break;
		case cartConstants.ADD_TO_CART_SUCCESS:
			state = {
				...state,
				loading: false,
				cartItems: action.payload.cartItems
			};
			break;
		case cartConstants.ADD_TO_CART_FAILURE:
			state = {
				...state,
				loading: false,
				error: action.payload.error
			};
			break;
	}
	return state;
};
