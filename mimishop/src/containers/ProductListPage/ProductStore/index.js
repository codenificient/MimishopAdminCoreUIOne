import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProductsBySlug } from '../../../actions';
import Card from '../../../components/UI/Card';
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
					<Card
						headerLeft={`${props.match.params.slug} products under ${priceRange[key]}`}
						headerRight={<Button variant="dark">Voir tout</Button>}
						style={{
							width: 'calc(100% - 40px)',
							margin: '20px',
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
											<span>4 stars</span>&nbsp;
											<span>900</span>
										</div>
										<div className="productPrice">{formatter.format(product.price)}</div>
									</div>
								</Link>
							))}
						</div>
					</Card>
				);
			})}
		</React.Fragment>
	);
}
