import axiosInstance from '../helpers/axios';
import { userConstants } from './constants';

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
