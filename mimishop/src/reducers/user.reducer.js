import { userConstants } from '../actions/constants';

const initState = {
	address: [],
	orders: [],
	error: null,
	loading: false,
	addingOrder: false,
	fetchingOrders: false,
	fetcthDetails: false,
	orderDetails: [],
	placedOrderId: null
};

export default (state = initState, action) => {
	switch (action.type) {
		case userConstants.GET_USER_ADDRESS_REQUEST:
			state = {
				...state,
				loading: true
			};
			break;
		case userConstants.GET_USER_ADDRESS_SUCCESS:
			state = {
				...state,
				loading: false,
				address: action.payload.address
			};
			break;
		case userConstants.GET_USER_ADDRESS_FAILURE:
			state = {
				...state,
				loading: false,
				error: action.payload.error
			};
			break;
		case userConstants.ADD_USER_ADDRESS_REQUEST:
			state = {
				...state,
				loading: true
			};
			break;

		case userConstants.ADD_USER_ADDRESS_SUCCESS:
			state = {
				...state,
				address: action.payload.address,
				loading: false
			};
			break;

		case userConstants.ADD_USER_ADDRESS_FAILURE:
			state = {
				...state,
				loading: false,
				error: action.payload.error
			};
			break;

		case userConstants.GET_USER_ORDER_REQUEST:
			state = {
				...state,
				fetchingOrders: true
			};
			break;
		case userConstants.GET_USER_ORDER_SUCCESS:
			state = {
				...state,
				fetchingOrders: false,
				orders: action.payload.orders
			};
			break;
		case userConstants.GET_USER_ORDER_FAILURE:
			state = {
				...state,
				fetchingOrders: false,
				error: action.payload.error
			};
			break;

		case userConstants.GET_USER_ORDER_DETAILS_REQUEST:
			state = {
				...state,
				fetcthDetails: true
			};
			break;
		case userConstants.GET_USER_ORDER_DETAILS_SUCCESS:
			state = {
				...state,
				fetcthDetails: false,
				orderDetails: action.payload.order
			};
			break;
		case userConstants.GET_USER_ORDER_DETAILS_FAILURE:
			state = {
				...state,
				fetcthDetails: false,
				error: action.payload.error
			};
			break;
		case userConstants.ADD_USER_ORDER_REQUEST:
			state = {
				...state,
				addingOrder: true
			};
			break;
		case userConstants.ADD_USER_ORDER_SUCCESS:
			state = {
				...state,
				addingOrder: false,
				placedOrderId: action.payload.order._id
			};
			break;
		case userConstants.ADD_USER_ORDER_FAILURE:
			state = {
				...state,
				addingOrder: false,
				error: action.payload.error
			};
			break;
	}
	return state;
};
