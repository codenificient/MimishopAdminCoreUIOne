import axiosInstance from '../helpers/axios';
import { categoryConstants, orderConstants, productConstants } from './constants';

export const getInitialDataAction = () => {
	return async (dispatch) => {
		const res = await axiosInstance.post(`/initialData`);
		if (res.status === 200) {
			const {  products  } = res.data;

			dispatch({
				type: productConstants.GET_ALL_PRODUCT_SUCCESS,
				payload: { products }
			});

		}
		// console.log(res);
	};
};
