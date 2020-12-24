import axiosInstance from '../helpers/axios';
import { productConstants } from './constants';

export const getAllProductsBySlug = (slug) => {
	return async (dispatch) => {
		const res = await axiosInstance.get(`/products/${slug}`);
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

export const getProductDetailsById = (payload) => {
	return async (dispatch) => {
		dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
		let res;
		try {
			const { productId } = payload.params;
			res = await axiosInstance.get(`/product/${productId}`);
			console.log(res);

			dispatch({
				type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
				payload: { productDetails: res.data.product }
			});
		} catch (error) {
			dispatch({
				type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
				error: { error: res.data.error }
			});
		}
	};
};
