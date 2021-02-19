import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProductsBySlug } from '../../../actions';
import Card from '../../../components/UI/Card';
import Price from '../../../components/UI/Price';
import Rating from '../../../components/UI/Rating';
import { formatter, generatePublicUrl } from '../../../urlConfig';
import './style.css';

//  ISSUES - UPDATE NUMBER OF RATINGS BY REMOVING PRODUCT QTY

export default function ProductStore(props) {
	const product = useSelector((state) => state.product);
	const priceRange = product.priceRange;

	const dispatch = useDispatch();

	// console.log(product.productsByPrice);

	useEffect(() => {
		const { match } = props;
		dispatch(getAllProductsBySlug(match.params.slug));
	}, []);

	useEffect(() => {
		document.title = 'Votre Boutique - MimiShop';
	}, []);

	if (product.productsByPrice.length < 0) {
		return;
	}

	return (
		<React.Fragment>
			<div className="container-fluid">
				{Object.keys(product.productsByPrice).map((key, index) => {
					return (
						<Card
							headerLeft={`Produits ${props.match.params.slug}  coutant moins que ${formatter.format(
								priceRange[key]
							)}`}
							headerRight={<Button variant="dark">Voir tout</Button>}
							style={{
								width: 'calc(100% - 250px)',
								margin: '20px auto',
								color: 'rgb(7, 155, 155)',
								fontSize: '20px'
							}}
						>
							<div style={{ display: 'flex' }}>
								{product.productsByPrice[key].map((product) => (
									<Link
										style={{ display: 'block' }}
										to={`/${product.slug}/${product._id}/p`}
										className="productContainer"
									>
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
												<Rating value="4.3" />
												&nbsp;
												<span>{product.quantity}</span>
											</div>
											<Price value={product.price} />
										</div>
									</Link>
								))}
							</div>
						</Card>
					);
				})}
			</div>
		</React.Fragment>
	);
}
