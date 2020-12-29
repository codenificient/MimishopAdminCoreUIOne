import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressAction } from '../../actions';
import Layout from '../../components/Layout';
import { Anchor, MaterialButton, MaterialInput } from '../../components/MaterialUI';
import AddressForm from './AddressForm';
import './style.css';

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

export default function CheckoutPage(props) {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const [ newAddress, setNewAddress ] = useState(false);
	const [ address, setAddress ] = useState([]);
	const [ confirmAddress, setConfirmAddress ] = useState(false);
	const [ selectedAddress, setSelectedAddress ] = useState(null);
	const onAddressSubmit = () => {};
	const onAddressCancel = () => {
		setNewAddress(false);
	};

	const selectAddress = (addr) => {
		const updatedAddress = address.map(
			(adr) => (adr._id == addr._id ? { ...adr, selected: true } : { ...adr, selected: false })
		);
		setAddress(updatedAddress);
	};

	const confirmDeliveryAddress = (addr) => {
		setSelectedAddress(addr);
		setConfirmAddress(true);
	};

	useEffect(
		() => {
			auth.authenticate && dispatch(getAddressAction());
		},
		[ auth.authenticate ]
	);

	useEffect(
		() => {
			const address = user.address.map((adr) => ({ ...adr, selected: false, edit: false }));
			setAddress(address);
		},
		[ user.address ]
	);

	const enableAddressEditForm = (addr) => {
		const updatedAddress = address.map(
			(adr) => (adr._id == addr._id ? { ...adr, edit: true } : { ...adr, edit: false })
		);
		setAddress(updatedAddress);
	};

	return (
		<Layout>
			<div className="cartContainer" style={{ alignItems: 'flex-end' }}>
				<div className="checkoutContainer">
					<CheckoutStep
						stepNumber={'1'}
						title={'LOGIN'}
						active={!auth.authenticate}
						body={
							auth.authenticate ? (
								<div className="loggedInId">
									<span style={{ fontWeight: '600' }}>{auth.user.fullName}</span>
									<span style={{ margin: '0 5px' }}>{auth.user.email}</span>
								</div>
							) : (
								<div className="inputContainer">
									<MaterialInput label="Email" />
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
									<div className="addressinfo">
										<span
										>{`${selectedAddress.addressType.toUpperCase()} - ${selectedAddress.streetAddress}`}</span>{' '}
										<br />
										<span
										>{`${selectedAddress.city.toUpperCase()} - ${selectedAddress.zipCode}`}</span>
									</div>
								) : (
									address.map((adr) => (
										<div className="flexRow addressContainer">
											<div>
												<input onClick={() => selectAddress(adr)} name="address" type="radio" />
											</div>
											<div className="flexRow sb addressinfo">
												<div>
													<div>
														<span>{adr.name}</span> &nbsp;
														<span>{adr.addressType}</span>&nbsp;
														<span>{adr.mobileNumber}</span>&nbsp;
													</div>

													<div>{adr.address}</div>

													{adr.selected && (
														<MaterialButton
															onClick={() => confirmDeliveryAddress(adr)}
															title="DELIVER HERE"
															style={{ width: '250px' }}
														/>
													)}
												</div>
												{/* {adr.selected && <div>EDIT</div>} */}
												{adr.selected && (
													<Anchor
														name="EDIT"
														onClick={() => enableAddressEditForm(adr)}
														style={{
															fontWeight: '600',
															color: '#177c7c'
														}}
													/>
												)}
											</div>
										</div>
									))
								)}
							</React.Fragment>
						}
					/>

					{confirmAddress ? null : newAddress ? (
						<AddressForm onSubmitForm={onAddressSubmit} onCancel={onAddressCancel} />
					) : (
						<CheckoutStep
							stepNumber={'+'}
							title={'ADD NEW ADDRESS'}
							active={false}
							onClick={() => setNewAddress(true)}
						/>
					)}

					<CheckoutStep stepNumber={'3'} title={'ORDER SUMMARY'} />
					<CheckoutStep stepNumber={'4'} title={'PAYMENT OPTIONS'} />
				</div>
			</div>
		</Layout>
	);
}
