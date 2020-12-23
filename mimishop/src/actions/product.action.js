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

export const getProductPage = (payload) => {
	return async (dispatch) => {
		try {
			const { cid, type } = payload.params;
			dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
			const res = await axiosInstance.get(`/page/${cid}/${type}`);
			// console.log(res);
			if (res.status === 200) {
				const { page } = res.data;
				dispatch({
					type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
					payload: { page }
				});
			} else {
				dispatch({
					type: productConstants.GET_PRODUCT_PAGE_FAILURE,
					error: res.data.error
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};
