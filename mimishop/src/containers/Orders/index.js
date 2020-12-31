import React, { useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersAction } from '../../actions';
import Layout from '../../components/Layout';
import { Breed } from '../../components/MaterialUI';
import Card from '../../components/UI/Card';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';

export default function OrderPage() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getOrdersAction());
	}, []);

	return (
		<Layout sidebar>
			<h1 className="textCenter">Orders Page</h1>
			<Breed
								breed={[
									{
										name: 'Accueil',
										href: '/'
									},
									{
										name: 'Mon Compte',
										href: '/account/'
									},
									{
										name: 'Mes Commandes',
										href: '/account/orders'
									}
								]}
								breedIcon={<IoIosArrowForward />}
							/>
			{user.orders.map((order) =>
				order.items.map((item) => (
					<Card style={{ maxWidth: '1200px', margin: '5px auto' }}>
						<div className="orderItemContainer">
							

							<div className="orderImgContainer">
								<img
									className="orderImg"
									src={generatePublicUrl(item.productId.productPictures[0].img)}
									alt={item.productId}
								/>
							</div>
							<div className="orderProductName">{item.productId.name}</div>
							<div>Payable Price: {item.payablePrice}</div>
							<div>order status: {order.paymentStatus}</div>
						</div>
					</Card>
				))
			)}
		</Layout>
	);
}
