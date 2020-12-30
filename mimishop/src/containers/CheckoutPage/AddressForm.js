import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddressAction } from '../../actions';
import { MaterialButton, MaterialInput } from '../../components/MaterialUI';

/**
 * @author
 * @function AddressForm
 **/

const AddressForm = (props) => {
	const { initialData } = props;
	const [ name, setName ] = useState(initialData ? initialData.name : '');
	const [ mobileNumber, setMobileNumber ] = useState(initialData ? initialData.mobileNumber : '');
	const [ zipCode, setZipCode ] = useState(initialData ? initialData.zipCode : '');
	const [ streetAddress, setStreetAddress ] = useState(initialData ? initialData.streetAddress : '');
	const [ addressTwo, setAddressTwo ] = useState(initialData ? initialData.addressTwo : '');
	const [ city, setCity ] = useState(initialData ? initialData.city : '');
	const [ state, setState ] = useState(initialData ? initialData.state : '');

	const [ addressType, setAddressType ] = useState(initialData ? initialData.addressType : '');
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [ submitFlag, setSubmitFlag ] = useState(false);
	const [ id, setId ] = useState(initialData ? initialData._id : '');

	const inputContainer = {
		width: '100%',
		marginRight: 10
	};

	const onAddressSubmit = (e) => {
		if (zipCode.length == 0) {
			return;
		}
		const payload = {
			address: {
				name,
				mobileNumber,
				zipCode,
				streetAddress,
				addressTwo,
				city,
				state,
				addressType
			}
		};
		console.log(payload);
		if (id) {
			payload.address._id = id;
		}
		dispatch(addAddressAction(payload));
		setSubmitFlag(true);
	};

	useEffect(
		() => {
			console.log('addressCount', user.address);
			if (submitFlag) {
				console.log('where are we', user);
				let _address = {};
				if (id) {
					_address = {
						_id: id,
						name,
						mobileNumber,
						zipCode,
						streetAddress,
						addressTwo,
						city,
						state,
						addressType
					};
				} else {
					_address = user.address.slice(user.address.length - 1)[0];
				}

				props.onSubmitForm(_address);
			}
		},
		[ user.address ]
	);

	const renderAddressForm = () => {
		return (
			<React.Fragment>
				<div className="flexRow">
					<div style={inputContainer}>
						<MaterialInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div style={inputContainer}>
						<MaterialInput
							label="10-digit mobile number"
							value={mobileNumber}
							onChange={(e) => setMobileNumber(e.target.value)}
						/>
					</div>
				</div>

				<div className="flexRow">
					<div style={inputContainer}>
						<MaterialInput
							label="Street Address"
							value={streetAddress}
							onChange={(e) => setStreetAddress(e.target.value)}
						/>
					</div>
				</div>
				<div className="flexRow">
					<div style={inputContainer}>
						<MaterialInput
							label="Address 2"
							value={addressTwo}
							onChange={(e) => setAddressTwo(e.target.value)}
						/>
					</div>
				</div>

				<div className="flexRow">
					<div style={inputContainer}>
						<MaterialInput label="City" value={city} onChange={(e) => setCity(e.target.value)} />
					</div>
					<div style={inputContainer}>
						<MaterialInput label="State" value={state} onChange={(e) => setState(e.target.value)} />
					</div>
				</div>
				<div className="flexRow">
					<div style={inputContainer}>
						<MaterialInput label="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
					</div>
				</div>
				<div>
					<label>Address Type</label>
					<div className="flexRow">
						<div>
							<input
								type="radio"
								onClick={() => setAddressType('home')}
								name="addressType"
								value="home"
							/>
							<span>Home</span>
						</div>
						<div>
							<input
								type="radio"
								onClick={() => setAddressType('work')}
								name="addressType"
								value="work"
							/>
							<span>Work</span>
						</div>
					</div>
				</div>
				<div className="flexRow">
					<MaterialButton
						title="SAUVEGARDER"
						onClick={onAddressSubmit}
						style={{
							width: '250px',
							margin: '20px'
						}}
					/>
					<MaterialButton
						title="CANCEL"
						onClick={props.onCancel}
						bgColor="rgb(235, 235, 235)"
						textColor="rgb(23, 124, 124)"
						style={{
							width: '250px',
							margin: '20px'
						}}
					/>
				</div>
			</React.Fragment>
		);
	};

	if (props.withoutLayout) {
		return <div>{renderAddressForm()}</div>;
	}

	return (
		<div className="checkoutStep" style={{ background: '#f5faff' }}>
			<div className={`checkoutHeader`}>
				<div>
					<span className="stepNumber">+</span>
					<span className="stepTitle">{'ADD NEW ADDRESS'}</span>
				</div>
			</div>
			<div
				style={{
					padding: '0 60px',
					paddingBottom: '20px',
					boxSizing: 'border-box'
				}}
			>
				{renderAddressForm()}
			</div>
		</div>
	);
};

export default AddressForm;
