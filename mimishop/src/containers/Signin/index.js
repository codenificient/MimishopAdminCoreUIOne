import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';

export default function Signin(props) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	// eslint-disable-next-line
	const [ error, setError ] = useState('');
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const userLogin = (e) => {
		e.preventDefault();
		const user = {
			email,
			password
		};

		dispatch(login(user));
	};

	if (auth.authenticate) {
		return <Redirect to={`/`} />;
	}
	return (
		<Layout>
			<h1>Signin Page</h1>
			<Container>
				<Row style={{ marginTop: '50px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={userLogin}>
							<Input
								label="Email"
								placeholder="Please provide your email"
								value={email}
								type="text"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								label="Password"
								placeholder="Enter your password"
								value={password}
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>

							<Button variant="primary" type="submit">
								Signin
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
