import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { getProductPage } from '../../../actions';
import Card from '../../../components/UI/Card';
import getParams from '../../../utils/getParams';
import './style.css';

export default function ProductPage(props) {
	const dispatch = useDispatch();
	const product = useSelector((state) => state.product);
	const { page } = product;

	useEffect(() => {
		const params = getParams(props.location.search);
		const payload = { params };
		dispatch(getProductPage(payload));
	}, []);

			useEffect(() => {
		document.title = 'Votre Produit - MimiShop'
	}, [])

	return (
		<div style={{ margin: '0 15px' }}>
			<h1>{page.title}</h1>
			<Carousel renderThumbs={() => {}}>
				{page.banners &&
					page.banners.map((banner, index) => (
						<a key={index} style={{ display: 'block' }} href={banner.navigateTo}>
							<img src={banner.img} alt="" />
						</a>
					))}
			</Carousel>

			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexWrap: 'wrap',
					margin: '10px 0'
				}}
			>
				{page.products &&
					page.products.map((product, index) => (
						<Card
							key={index}
							style={{
								width: '300px',
								height: '200px',
								margin: '5px'
							}}
							href={product.navigateTo}
						>
							<img src={product.img} alt="" />
						</Card>
					))}
			</div>
		</div>
	);
}
