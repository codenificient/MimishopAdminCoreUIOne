import React from 'react';
import Layout from '../../components/Layout';
import getParams from '../../utils/getParams';
import ClothingAndAccessories from './ClothingAndAccessories';
import ProductPage from './ProductPage';
import ProductStore from './ProductStore';
import './style.css';

export default function ProductListPage(props) {
	const renderProduct = () => {
		// console.log(props);

		const params = getParams(props.location.search);
		let content = null;
		switch (params.type) {
			case 'store':
				content = <ProductStore {...props} />;
				break;

			case 'page':
				content = <ProductPage {...props} />;
				break;
			case 'product':
			default:
				content = <ClothingAndAccessories {...props} />;
		}
		return content;
	};

	return (
		<Layout>
			<h1>Product List Page</h1>

			{renderProduct()}
		</Layout>
	);
}
