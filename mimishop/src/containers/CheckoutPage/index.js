import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressAction, getCartItemsAction, login } from '../../actions';
import Layout from '../../components/Layout';
import { Anchor, MaterialButton, MaterialInput } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import Card from '../../components/UI/Card';
import CartPage from '../CartPage';
import AddressForm from './AddressForm';
import './style.css';

/**
 * @author
 * @function CheckoutPage
 **/

const CheckoutStep = (props) => {
	return (
		<div className="checkoutStep">
			<div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`}>
				<div>
					<span className="stepNumber">{props.stepNumber}</span>
					<span className="stepTitle">{props.title}</span>
				</div>
			</div>
			{props.body && props.body}
		</div>
	);
};

const Address = ({ adr, selectAddress, enableAddressEditForm, confirmDeliveryAddress, onAddressSubmit }) => {
	return (
		<div className="flexRow addressContainer">
			<div>
				<input name="address" onClick={() => selectAddress(adr)} type="radio" />
			</div>
			<div className="flexRow sb addressinfo">
				{!adr.edit ? (
					<div style={{ width: '100%' }}>
						<div className="addressDetail">
							<div>
								<span className="addressName">{adr.name}</span>
								<span className="addressType">{adr.addressType}</span>
								<span className="addressMobileNumber">{adr.mobileNumber}</span>
							</div>
							{adr.selected && <Anchor name="EDIT" onClick={() => enableAddressEditForm(adr)} />}
						</div>
						<div className="fullAddress">
							{adr.streetAddress} <br /> {`${adr.state} - ${adr.zipCode}`}
						</div>
						{adr.selected && (
							<MaterialButton
								title="CHOISIR ADDRESSE"
								onClick={() => confirmDeliveryAddress(adr)}
								style={{
									width: '200px',
									margin: '10px 0'
								}}
							/>
						)}
					</div>
				) : (
					<AddressForm
						withoutLayout={true}
						onSubmitForm={onAddressSubmit}
						initialData={adr}
						onCancel={() => enableAddressEditForm(false)}
					/>
				)}
			</div>
		</div>
	);
};

const CheckoutPage = (props) => {
	const user = useSelector((state) => state.user);
	const auth = useSelector((state) => state.auth);
	const cart = useSelector((state) => state.cart);
	const [ newAddress, setNewAddress ] = useState(false);
	const [ address, setAddress ] = useState([]);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmAddress, setConfirmAddress ] = useState(false);
	const [ selectedAddress, setSelectedAddress ] = useState(null);
	const [ orderSummary, setOrderSummary ] = useState(false);
	const [ orderConfirmation, setOrderConfirmation ] = useState(false);
	const [ paymentOption, setPaymentOption ] = useState(false);
	const [ confirmOrder, setConfirmOrder ] = useState(false);

	const dispatch = useDispatch();

	const onAddressSubmit = (addr) => {
		setSelectedAddress(addr);
		setConfirmAddress(true);
		setOrderSummary(true);
	};

	const userLogin = () => {
		dispatch(login({ email, password }));
	};
	const selectAddress = (addr) => {
		//console.log(addr);
		const updatedAddress = address.map(
			(adr) => (adr._id === addr._id ? { ...adr, selected: true } : { ...adr, selected: false })
		);
		setAddress(updatedAddress);
	};

	const confirmDeliveryAddress = (addr) => {
		setSelectedAddress(addr);
		setConfirmAddress(true);
		setOrderSummary(true);
	};

	const enableAddressEditForm = (addr) => {
		const updatedAddress = address.map(
			(adr) => (adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false })
		);
		setAddress(updatedAddress);
	};

	const userOrderConfirmation = () => {
		setOrderConfirmation(true);
		setOrderSummary(false);
		setPaymentOption(true);
	};

	const onConfirmOrder = () => {
		const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
			const { price, qty } = cart.cartItems[key];
			return totalPrice + price * qty;
		}, 0);
		const items = Object.keys(cart.cartItems).map((key) => ({
			productId: key,
			payablePrice: cart.cartItems[key].price,
			purchasedQty: cart.cartItems[key].qty
		}));
		const payload = {
			addressId: selectedAddress._id,
			totalAmount,
			items,
			paymentStatus: 'pending',
			paymentType: 'cod'
		};

		console.log(payload);
		// dispatch(addOrder(payload));
		setConfirmOrder(true);
	};

	useEffect(
		() => {
			auth.authenticate && dispatch(getAddressAction());
			auth.authenticate && dispatch(getCartItemsAction());
		},
		[ auth.authenticate ]
	);

	useEffect(
		() => {
			const address = user.address.map((adr) => ({
				...adr,
				selected: false,
				edit: false
			}));
			setAddress(address);
			//user.address.length === 0 && setNewAddress(true);
		},
		[ user.address ]
	);

	useEffect(
		() => {
			if (confirmOrder && user.placedOrderId) {
				props.history.push(`/order_details/${user.placedOrderId}`);
			}
		},
		[ user.placedOrderId ]
	);

	return (
		<Layout>
			<div className="cartContainer" style={{ alignItems: 'flex-start' }}>
				<div className="checkoutContainer">
					{/* check if user logged in or not */}
					<CheckoutStep
						stepNumber={'1'}
						title={'SE CONNECTER'}
						active={!auth.authenticate}
						body={
							auth.authenticate ? (
								<div className="loggedInId">
									<span style={{ fontWeight: 600 }}>{auth.user.fullName}</span>
									<span style={{ margin: '0 5px' }}>{auth.user.email}</span>
								</div>
							) : (
								<div>
									<div className="loginInputContainer">
										<MaterialInput
											type="text"
											label="Email ou Numéro de Telephone"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>

										<MaterialInput
											type="password"
											label="Votre Mot de Passe"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>

										<div className="flexRow textCenter">
											<MaterialButton
												title="Se connecter"
												bgColor="rgb(23, 124, 124)"
												textColor="#fff"
												style={{ margin: '20px', borderRadius: '30px', minWidth: '120px' }}
												style={{
													width: '300px',
													margin: '0 0 20px 20px'
												}}
												onClick={userLogin}
											/>

											<MaterialButton
												title="Recevoir code par SMS"
												bgColor="rgb(235, 235, 235)"
												textColor="rgb(23, 124, 124)"
												style={{ margin: '20px', borderRadius: '30px', minWidth: '160px' }}
												style={{
													width: '300px',
													margin: '0 0 20px 20px'
												}}
											/>
										</div>
									</div>
								</div>
							)
						}
					/>
					<CheckoutStep
						stepNumber={'2'}
						title={'DELIVERY ADDRESS'}
						active={!confirmAddress && auth.authenticate}
						body={
							<React.Fragment>
								{confirmAddress ? (
									<div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.streetAddress} - ${selectedAddress.zipCode}`}</div>
								) : (
									address.map((adr) => (
										<Address
											selectAddress={selectAddress}
											enableAddressEditForm={enableAddressEditForm}
											confirmDeliveryAddress={confirmDeliveryAddress}
											onAddressSubmit={onAddressSubmit}
											adr={adr}
										/>
									))
								)}
							</React.Fragment>
						}
					/>

					{/* AddressForm */}
					{confirmAddress ? null : newAddress ? (
						<AddressForm onSubmitForm={onAddressSubmit} onCancel={() => setNewAddress(false)} />
					) : auth.authenticate ? (
						<CheckoutStep
							stepNumber={'+'}
							title={'ADD NEW ADDRESS'}
							active={false}
							onClick={() => setNewAddress(true)}
						/>
					) : null}

					<CheckoutStep
						stepNumber={'3'}
						title={'ORDER SUMMARY'}
						active={orderSummary}
						body={
							orderSummary ? (
								<CartPage onlyCartItems={true} />
							) : orderConfirmation ? (
								<div className="stepCompleted">{Object.keys(cart.cartItems).length} products</div>
							) : null
						}
					/>

					{orderSummary && (
						<Card
							style={{
								width: 'calc(100%)'
							}}
						>
							<div
								className="flexRow sb"
								style={{
									padding: '20px',
									alignItems: 'center',

									boxShadow: '0 21px 21px 0px rgba(0, 0, 0, 0.2)'
								}}
							>
								<p style={{ fontSize: '12px' }}>
									Order confirmation email will be sent to <strong>{auth.user.email}</strong>
								</p>
								<MaterialButton
									title="CONTINUER"
									onClick={userOrderConfirmation}
									style={{
										width: '200px'
									}}
								/>
							</div>
						</Card>
					)}

					<CheckoutStep
						stepNumber={'4'}
						title={'PAYMENT OPTIONS'}
						active={paymentOption && auth.authenticate}
						body={
							paymentOption && (
								<div className="stepCompleted">
									<div className="flexRow">
										<input type="radio" name="paymentOption" value="cod" />&nbsp;
										<div>Credit card</div>
									</div>
									<div className="flexRow">
										<input type="radio" name="paymentOption" value="cod" />&nbsp;
										<div>Debit card</div>
									</div>
									<div className="flexRow">
										<input type="radio" name="paymentOption" value="cod" />&nbsp;
										<div>PayPal</div>
									</div>
									<div className="flexRow">
										<input type="radio" name="paymentOption" value="cod" />&nbsp;
										<div>Affirm</div>
									</div>
									<div className="flexRow">
										<input type="radio" name="paymentOption" value="cod" />&nbsp;
										<div>Cash on delivery</div>
									</div>
									<div className="flexRow textCenter">
										<MaterialButton
											title="PAYER MAINTENANT"
											onClick={onConfirmOrder}
											style={{
												width: '200px',
												margin: '0 0 20px 20px'
											}}
										/>
										<MaterialButton
											title="RETOUR PANNIER"
											onClick={() => props.history.push(`/cart`)}
											bgColor="rgb(235, 235, 235)"
											textColor="rgb(23, 124, 124)"
											style={{
												width: '200px',
												margin: '0 0 20px 20px'
											}}
										/>
									</div>
								</div>
							)
						}
					/>
				</div>

				{/* Price Component */}
				<PriceDetails
					totalItem={Object.keys(cart.cartItems).reduce(function(qty, key) {
						return qty + cart.cartItems[key].qty;
					}, 0)}
					subTotal={Object.keys(cart.cartItems).reduce((subTotal, key) => {
						const { price, qty } = cart.cartItems[key];
						return subTotal + price * qty;
					}, 0)}
					delivery={Object.keys(cart.cartItems).reduce((delivery, key) => {
						let { deliveryFee, qty } = cart.cartItems[key];
						if (!deliveryFee) {
							deliveryFee = 0;
						}
						return delivery + deliveryFee * qty;
					}, 0)}
				/>
			</div>
		</Layout>
	);
};

export default CheckoutPage;
