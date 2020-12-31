import axiosInstance from '../helpers/axios';
import { authConstants, cartConstants } from './constants';

export const login = (user) => {
	// console.log(user);
	return async (dispatch) => {
		dispatch({ type: authConstants.LOGIN_REQUEST });
		const res = await axiosInstance.post(`/signin`, {
			...user
		});

		if (res.status === 200) {
			const { token, user } = res.data;
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
			dispatch({
				type: authConstants.LOGIN_SUCCESS,
				payload: {
					token,
					user
				}
			});
		} else {
			if (res.status === 400) {
				dispatch({
					type: authConstants.LOGIN_FAILURE,
					payload: { error: res.data.error }
				});
			}
		}
	};
};

exports.signup = (req, res) => {
	User.findOne({ email: req.body.email }).exec(async (error, user) => {
		if (user)
			return res.status(400).json({
				message: 'Admin already registered'
			});

		const { firstName, lastName, email, password } = req.body;
		const hash_password = await bcrypt.hash(password, 10);
		const _user = new User({
			firstName,
			lastName,
			email,
			hash_password,
			username: shortid.generate(),
			role: 'admin'
		});

		_user.save((error, data) => {
			if (error) {
				return res.status(400).json({
					message: 'Something went wrong'
				});
			}

			if (data) {
				return res.status(201).json({
					message: 'Admin created successfully..!'
				});
			}
		});
	});
};

export const isUserLoggedIn = () => {
	return async (dispatch) => {
		const token = localStorage.getItem('token');
		if (token) {
			const user = JSON.parse(localStorage.getItem('user'));
			dispatch({
				type: authConstants.LOGIN_SUCCESS,
				payload: {
					token,
					user
				}
			});
		} else {
			dispatch({
				type: authConstants.LOGIN_FAILURE,
				payload: { error: 'Failed to login' }
			});
		}
	};
};

export const signout = () => {
	return async (dispatch) => {
		dispatch({ type: authConstants.LOGOUT_REQUEST });
		// const res = await axiosInstance.post(`/signout`);
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		dispatch({ type: authConstants.LOGOUT_SUCCESS });
		dispatch({ type: cartConstants.RESET_CART });

		// if (res.status === 200) {
		// 	localStorage.clear();
		// 	dispatch({
		// 		type: authConstants.LOGOUT_SUCCESS
		// 	});
		// } else {
		// 	dispatch({
		// 		type: authConstants.LOGOUT_FAILURE,
		// 		payload: { error: res.data.error }
		// 	});
		// }
	};
};
