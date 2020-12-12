import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';

export default function Signup() {
	const [ firstName, setfirstName ] = useState('');
	const [ lastName, setlastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	// eslint-disable-next-line
	const [ error, setError ] = useState('');
	const auth = useSelector((state) => state.auth);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const userSignup = (e) => {
		e.preventDefault();

		const user = {
			firstName,
			lastName,
			email,
			password
		};
		dispatch(signup(user));
	};

	if (auth.authenticate) {
		return <Redirect to={`/`} />;
	}

	if (user.loading) {
		return <p>Loading...</p>;
	}

	return (
		<Layout>
			<h1>Signup Page</h1>
			<Container>
				<Row style={{ marginTop: '50px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={userSignup}>
							<Row>
								<Col md={6}>
									<Input
										label="First Name"
										placeholder="Enter your first name"
										value={firstName}
										type="text"
										onChange={(e) => setfirstName(e.target.value)}
									/>
								</Col>
								<Col md={6}>
									<Input
										label="Last Name"
										placeholder="Enter your last name"
										value={lastName}
										type="text"
										onChange={(e) => setlastName(e.target.value)}
									/>
								</Col>
							</Row>
							<Input
								label="Email"
								placeholder="Please enter your email"
								value={email}
								type="text"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								label="Password"
								placeholder="Select a new password"
								value={password}
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Input label="Upload your profile pictures" type="file" onChange={() => {}} />

							<Button style={{ marginTop: '20px' }} variant="primary" type="submit">
								Sign up now
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
