import React, { useEffect } from 'react';
import { useState } from 'react';
import { IoMdArrowUp, IoMdCart } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartAction } from '../../actions';
import { getInitialDataAction } from '../../actions/initialData.action';
import Layout from '../../components/Layout';
import { MaterialButton } from '../../components/MaterialUI';
import Card from '../../components/UI/Card';
import Price from '../../components/UI/Price';
import Rating from '../../components/UI/Rating';
import { formatter, generatePublicUrl, scrollToTop } from '../../urlConfig';
import ProductListPage from '../ProductListPage';
import './style.css';

// function groupBy(objectArray, property) {
// 	return objectArray.reduce(function(acc, obj) {
// 		var key = obj[property];
// 		if (!acc[key]) {
// 			acc[key] = [];
// 		}
// 		acc[key].push(obj);
// 		return acc;
// 	}, {});
// }

function shorten(str, maxLen, separator = ' ') {
	if (str.length <= maxLen) return str;
	return str.substr(0, str.lastIndexOf(separator, maxLen));
}

export default function Home(props) {
	const dispatch = useDispatch();
	const product = useSelector((state) => state.product);
	const searchField = useSelector((state) => state.searchField)
	const [ filteredProducts, setFilteredProducts ] = useState([]);

	// let lowerStr = searchField.toLowerCase();

	console.log({ searchField });
	// const categoryList = [];

	// const categoryName = product.allProducts.map((item) => item.name.split(' ')[0]);

	// categoryList.push(categoryName);

	// let myOrderedArray = product.allProducts
	// 	.map((item) => item.name.split(' ')[0])
	// 	.reduce(function(accumulator, currentValue) {
	// 		if (accumulator.indexOf(currentValue) === -1) {
	// 			accumulator.push(currentValue);
	// 		}
	// 		return accumulator;
	// 	}, []);

	// console.table(myOrderedArray);

	// var groupedProducts = groupBy(product.allProducts.map((item) => item.name), myOrderedArray);

	// console.table( groupedProducts );

	// const filteredProducts = product.allProducts.filter((item) => item.name.toLowerCase().includes(searchField.toLowerCase()));

	useEffect(() => {
		document.title = 'Bienvenu - MimiShop Ouaga';
	}, []);

	useEffect(() => {
		dispatch(getInitialDataAction());
	}, []);

	return (
		<Layout>
			<div
				style={{
					maxWidth: '1500px',
					margin: '30px auto'
				}}
			>
				<span id="top" />
				{product.allProducts.map((item) => (
					<Card style={{ display: 'flex', padding: '40px', margin: '40px auto' }}>
						<Link to={`/${item.category.name}/${item._id}/p`}>
							<div className="flexRow">
								<div style={{ flex: 2 }}>
									<div className="ItemImgContainer">
										<img
											src={generatePublicUrl(item.productPictures[0].img)}
											alt={item.productPictures[0].img}
										/>
									</div>
								</div>
								<div className="sb" style={{ flex: 10, padding: '0 60px' }}>
									<div className="ItemInfoContainer">
										<div className="ItemName">{item.name}</div>
										<div className="ItemDesc">
											<span>{shorten(item.description, 200)}...</span>
										</div>
										<div className="ItemDesc">
											<span>Quantité Disponible: {item.quantity}</span>
										</div>
										<div>
											<Rating value={4.6} />
										</div>
										<div className="ItemPrice">
											<Price fontSize="20px" value={item.price} />
										</div>
									</div>
									<div>
										<MaterialButton
											title="AJOUT AU PANNIER"
											bgColor="#ff9f00"
											textColor="#ffffff"
											style={{
												marginRight: '12px',
												width: '220px',
												float: 'right'
											}}
											icon={<IoMdCart />}
											onClick={() => {
												const { _id, name, price, deliveryFee } = item;
												const img = item.productPictures[0].img;
												dispatch(addToCartAction({ _id, name, price, img, deliveryFee }));
												props.history.push(`/cart`);
											}}
										/>
									</div>
								</div>
							</div>
						</Link>
					</Card>
				))}
			</div>
		</Layout>
	);
}
