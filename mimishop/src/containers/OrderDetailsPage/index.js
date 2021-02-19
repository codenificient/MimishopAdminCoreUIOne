import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetailsAction } from '../../actions';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import Price from '../../components/UI/Price';
import { formatter, generatePublicUrl } from '../../urlConfig';
import './style.css';

const OrderDetailsPage = (props) => {
	const dispatch = useDispatch();
	const orderDetails = useSelector((state) => state.user.orderDetails);
	// console.log(orderDetails);
	useEffect(() => {
		// console.log({ props });
		const payload = {
			orderId: props.match.params.orderId
		};
		// console.log(payload);
		dispatch(getOrderDetailsAction(payload));
	}, []);

	useEffect(() => {
		document.title = 'Détails de Commande - MimiShop';
	}, []);

	const formatDate = (date) => {
		if (date) {
			const d = new Date(date);
			return `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
		}
		return '';
	};

	const formatDate2 = (date) => {
		const month = [ 'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc' ];
		if (date) {
			const d = new Date(date);
			return `${d.getDate()} ${month[d.getMonth()]}  ${d.getFullYear()}`;
		}
	};

	if (!(orderDetails && orderDetails.deliveryAddress)) {
		return null;
	}

	return (
		<Layout>
			<div
				style={{
					maxWidth: '1500px',
					margin: '30px auto'
				}}
			>
				<Card
					style={{
						margin: '40px auto'
					}}
				>
					<div className="delAdrContainer sb">
						<div className="delAdrDetails">
							<div className="delTitle">Numéro de la Commande - {orderDetails._id}</div>
							<div className="stepCompleted">
								<div className="delAddress">
									<span>
										Frais de Livraison:{' '}
										{orderDetails.deliveryCharges ? (
											formatter.format(orderDetails.deliveryCharges)
										) : (
											'GRATUIT'
										)}
									</span>
								</div>
								<span />
								<Price fontSize="23px" title="Facture Totale" value={orderDetails.totalAmount} />
							</div>
						</div>
						<div className="delAdrDetailsRight">
							<div className="delTitle">Paiement</div>
							<div className="paymentStatus">
								<span>Méthode: {orderDetails.paymentType}</span>
							</div>
							<div className="paymentStatus">
								<span>Status: {orderDetails.paymentStatus}</span>
							</div>
						</div>
					</div>
					<div className="delAdrContainer sb">
						<div className="delAdrDetails">
							<div className="delTitle">Addresse de Livraison</div>
							<div className="stepCompleted">
								<div className="delName">Destinataire: {orderDetails.deliveryAddress.name}</div>
								<div className="delAddress">Addresse: {orderDetails.deliveryAddress.streetAddress}</div>
								<div className="delPhoneNumber" />
								Numéro de Contact: {orderDetails.deliveryAddress.mobileNumber}
							</div>
						</div>
						<div className="delMoreActionContainer">
							<div className="delTitle">Autres Actions</div>
							<div className="delName stepCompleted">Télécharger le reçu</div>
						</div>
					</div>
				</Card>

				{orderDetails.items.map((item, index) => (
					<Card style={{ display: 'flex', padding: '40px', margin: '40px auto' }}>
						<div className="flexRow">
							<div style={{ flex: 2 }}>
								<div className="delItemImgContainer">
									<img
										src={generatePublicUrl(item.productId.productPictures[0].img)}
										alt={item.productId.productPictures[0].img}
									/>
								</div>
							</div>
							<div style={{ flex: 10, padding: '0 60px' }}>
								<div className="delItemInfoContainer">
									<div className="delItemName">{item.productId.name}</div>
									<div className="delItemPrice">
										<span>Quantité Achétée: {item.purchasedQty}</span>
									</div>
									<div className="delItemPrice">
										<Price fontSize="20px" value={item.payablePrice} />
									</div>
								</div>

								<div className="orderTrack">
									{orderDetails.orderStatus.map((status) => (
										<div className={`orderStatus ${status.isCompleted ? 'active' : ''}`}>
											<div className={`point ${status.isCompleted ? 'active' : ''}`} />
											<div className="orderInfo">
												<div className="status">{status.type}</div>
												<div className="date">{formatDate(status.date)}</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{orderDetails.orderStatus[3].isCompleted && (
								<div style={{ flex: 3, fontWeight: '500', fontSize: 14 }}>
									{`Livraison éffectuée le ${formatDate2(orderDetails.orderStatus[3].date)}`}
								</div>
							)}
						</div>
					</Card>
				))}
			</div>
		</Layout>
	);
};

export default OrderDetailsPage;
