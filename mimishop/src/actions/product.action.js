import axiosInstance from '../helpers/axios';
import { productConstants } from './constants';

export const getAllProductsBySlug = (slug) => {
	return async (dispatch) => {
		const res = await axiosInstance.get(`/product/${slug}`);
		if (res.status === 200) {
			dispatch({
				type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
				payload: res.data
			});
		}
		console.log(res);
	};
};
