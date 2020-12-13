import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsBySlug } from '../../actions';
import Layout from '../../components/Layout';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';

export default function ProductListPage(props) {
	const product = useSelector((state) => state.product);
	const [ priceRange, setPriceRange ] = useState({
		under200: '$200',
		under500: '$500',
		under800: '$800',
		under1k: '$1,000',
		under10k: '$10,000'
	});
	const dispatch = useDispatch();
	const { match } = props;
	useEffect(() => {
		dispatch(getAllProductsBySlug(match.params.slug));
	}, []);

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});

	return (
		<Layout>
			{Object.keys(product.productsByPrice).map((key, index) => {
				return (
					<div className="card">
						<div className="cardHeader">
							<div className="productGridTitle">
								{props.match.params.slug} products under {priceRange[key]}
							</div>
							<Button variant="dark">view all</Button>
						</div>
						<div style={{ display: 'flex' }}>
							{product.productsByPrice[key].map((product) => (
								<div className="productContainer">
									<div className="productImageContainer">
										<img
											src={generatePublicUrl(product.productPictures[0].img)}
											alt={product.name}
										/>
									</div>
									<div className="productInfo">
										<div className="productName" style={{ margin: '5px 10px' }}>
											{product.name}
										</div>
										<div>
											<span>4 stars</span>&nbsp;
											<span>900</span>
										</div>
										<div className="productPrice">{formatter.format(product.price)}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				);
			})}
			<h1>Product List Page</h1>
		</Layout>
	);
}
