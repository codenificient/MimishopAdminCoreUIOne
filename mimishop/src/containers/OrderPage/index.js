import React, { useEffect } from 'react';
import { IoIosArrowForward, IoMdAddCircle, IoMdArrowUp } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrdersAction } from '../../actions';
import Layout from '../../components/Layout';
import { Breed, MaterialButton } from '../../components/MaterialUI';
import Card from '../../components/UI/Card';
import Price from '../../components/UI/Price';
import { formatter, generatePublicUrl, scrollToTop } from '../../urlConfig';
import './style.css';

export default function OrderPage(props) {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getOrdersAction());
	}, []);

			useEffect(() => {
		document.title = 'Vos Commandes sur MimiShop'
	}, [])

	// console.log(props.match);

	return (
		<Layout>
			{/* <h1 className="textCenter">Orders Page</h1> */}
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
			{user.orders.map((order) => {
				return order.items.map((item) => (
					<Card style={{ maxWidth: '1300px', display: 'block', margin: '40px auto' }}>
						<Link
							to={`/order_details/${order._id}`}
							className="orderItemContainer">
							<div className="orderImgContainer">
								<img
									className="orderImg"
									src={generatePublicUrl(item.productId.productPictures[0].img)}
									alt={item.productId}
								/>
							</div>
							<div className="orderProductName">{item.productId.name}</div>
							
							<div>Facture: <Price value={item.payablePrice} /> </div>
							<div>Status de Paiement: {order.paymentStatus}</div> 
						
						</Link>
					</Card>
				));
			})}
			
		</Layout>
	);
}
