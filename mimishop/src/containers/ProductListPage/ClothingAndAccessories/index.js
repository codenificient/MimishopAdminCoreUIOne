import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Link } from 'react-router-dom';
import { getAllProductsBySlug } from '../../../actions';
import Card from '../../../components/UI/Card';
import { formatter, generatePublicUrl } from '../../../urlConfig';
import './style.css';

export default function ClothingAndAccessories(props) {
	const dispatch = useDispatch();
	const product = useSelector((state) => state.product);

	useEffect(() => {
		const { match } = props;
		dispatch(getAllProductsBySlug(match.params.slug));
	}, []);

	useEffect(() => {
		document.title = 'Votre Magasin - MimiShop';
	}, []);

	return (
		<div style={{ margin: '10px' }}>
			<Card style={{ display: 'flex', boxSizing: 'border-box', padding: '10px' }}>
				{product.products &&
					product.products.map((product) => (
						<div className="caContainer">
							<Link className="caImgContainer" to={`/${product.slug}/${product._id}/p`}>
								<img src={generatePublicUrl(product.productPictures[0].img)} alt={product.name} />
							</Link>
							<div>
								<div className="caProductName">{product.name}</div>
								<div className="caProductPrice">{formatter.format(product.price)}</div>
							</div>
						</div>
					))}
			</Card>
		</div>
	);
}
