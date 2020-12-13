import { productConstants } from '../actions/constants';

const initialState = {
	products: [],
	productsByPrice: {
		under200: [],
		under500: [],
		under800: [],
		under1k: [],
		under10k: []
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
			state = {
				...state,
				products: action.payload.products,
				productsByPrice: {
					...action.payload.productsByPrice
				}
			};
			break;
	}
	return state;
};
