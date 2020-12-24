import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProductsBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import './style.css';

export default function ProductStore(props) {
	const product = useSelector((state) => state.product);

	const [ priceRange, setPriceRange ] = useState({
		under2K: '2 000 CFA',
		under5K: '5 000 CFA',
		under8K: '8 000 CFA',
		under10K: '10 000 CFA',
		under100K: '100 000 CFA'
	});
	const dispatch = useDispatch();
	const { match } = props;
	useEffect(() => {
		dispatch(getAllProductsBySlug(match.params.slug));
	}, []);

	const formatter = new Intl.NumberFormat('fr-FR', {
		style: 'currency',
		currency: 'XOF',
		minimumFractionDigits: 0
	});

	return (
		<React.Fragment>
			{Object.keys(product.productsByPrice).map((key, index) => {
				return (
					<div className="card">
						<div className="cardHeader">
							<div className="productGridTitle">
								{props.match.params.slug} products under {priceRange[key]}
							</div>
							<Button variant="dark">Voir tout</Button>
						</div>
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
											<span>4 stars</span>&nbsp;
											<span>900</span>
										</div>
										<div className="productPrice">{formatter.format(product.price)}</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				);
			})}
		</React.Fragment>
	);
}
