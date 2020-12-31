import axiosInstance from '../helpers/axios';
import { cartConstants, userConstants } from './constants';

export const getAddressAction = () => {
	return async (dispatch) => {
		try {
			const res = await axiosInstance.post(`/user/getaddress`);
			dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });

			if (res.status === 200) {
				const { userAddress: { address } } = res.data;

				dispatch({
					type: userConstants.GET_USER_ADDRESS_SUCCESS,
					payload: { address }
				});
			} else {
				dispatch({
					type: userConstants.GET_USER_ADDRESS_FAILURE,
					payload: { error: res.data.error }
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const addAddressAction = (payload) => {
	return async (dispatch) => {
		try {
			const res = await axiosInstance.post(`/user/address/create`, { payload });
			dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });

			if (res.status === 201) {
				console.log(res);
				dispatch({
					type: userConstants.ADD_USER_ADDRESS_SUCCESS,
					payload: { address: res.data.address }
				});
			} else {
				dispatch({
					type: userConstants.ADD_USER_ADDRESS_FAILURE,
					payload: { error: res.data.error }
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const addOrderAction = (payload) => {
	return async (dispatch) => {
		try {
			const res = await axiosInstance.post(`/addorder`, payload);
			dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });

			if (res.status === 201) {
				console.log(res);
				dispatch({
					type: cartConstants.RESET_CART
				});
				// dispatch({
				// 	type: userConstants.ADD_USER_ORDER_SUCCESS,
				// 	payload: { address: res.data.address }
				// });
			} else {
				dispatch({
					type: userConstants.ADD_USER_ORDER_FAILURE,
					payload: { error: res.data.error }
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getOrdersAction = () => {
	return async (dispatch) => {
		try {
			const res = await axiosInstance.get(`/getorders`);
			dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });

			if (res.status === 200) {
				console.log(res);
				dispatch({
					type: userConstants.GET_USER_ORDER_SUCCESS,
					payload: { orders: res.data.orders }
				});
				// dispatch({
				// 	type: userConstants.ADD_USER_ORDER_SUCCESS,
				// 	payload: { address: res.data.address }
				// });
			} else {
				dispatch({
					type: userConstants.ADD_USER_ORDER_FAILURE,
					payload: { error: res.data.error }
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getOrderAction = (payload) => {
	return async (dispatch) => {
		try {
			const res = await axiosInstance.post(`/getorder`, payload);
			dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });

			if (res.status === 200) {
				console.log(res);
				dispatch({
					type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
					payload: { order: res.data.order }
				});
				
			} else {
				dispatch({
					type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
					payload: { error: res.data.error }
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const clearCartAction = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: cartConstants.RESET_CART
			});
		} catch (error) {
			console.log(error);
		}
	};
};
