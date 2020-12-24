import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import cartReducer from './cart.reducers';
import categoryReducer from './category.reducers';
import productReducer from './product.reducer';

const rootReducer = combineReducers({
	category: categoryReducer,
	product: productReducer,
	auth: authReducer,
	cart: cartReducer
});

export default rootReducer;
