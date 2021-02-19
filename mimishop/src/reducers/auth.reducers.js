import { authConstants } from '../actions/constants';

const initialState = {
	token: '',
	user: {
		firstName: '',
		lastName: '',
		email: '',
		picture: ''
	},
	authenticate: false,
	authenticating: false,
	loading: false,
	error: null,
	message: ''
};
// eslint-disable-next-line
export default (state = initialState, action) => {
	// console.log(action);
	// eslint-disable-next-line
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			state = {
				...state,
				authenticating: true
			};
			break;

		case authConstants.LOGIN_SUCCESS:
			state = {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticate: true,
				authenticating: false
			};
			break;

		case authConstants.LOGOUT_REQUEST:
			state = {
				...state,
				loading: true
			};
			break;
		case authConstants.LOGOUT_SUCCESS:
			state = {
				...initialState
			};
			break;
		case authConstants.LOGOUT_FAILURE:
			state = {
				...state,
				loading: false,
				error: action.payload.error
			};
			break;
	}
	return state;
};
