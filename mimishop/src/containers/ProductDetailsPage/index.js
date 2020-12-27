import React, { useEffect } from 'react';
import { AiFillThunderbolt } from 'react-icons/ai';
import { IoIosArrowForward, IoIosStar, IoMdCart } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, getProductDetailsById } from '../../actions';
import Layout from '../../components/Layout';
import { MaterialButton } from '../../components/MaterialUI';
import { formatter, generatePublicUrl } from '../../urlConfig';
import './style.css';

export default function ProductDetailsPage(props) {
	const product = useSelector((state) => state.product);

	const dispatch = useDispatch();

	useEffect(() => {
		const { productId } = props.match.params;
		const payload = {
			params: {
				productId
			}
		};
		dispatch(getProductDetailsById(payload));
	}, []);

	if (Object.keys(product.productDetails).length === 0) {
		return null;
	}

	return (
		<Layout>
			{/* <div>{product.productDetails.name}</div> */}
			<div className="productDescriptionContainer">
				<div className="flexRow">
					<div className="verticalImageStack">
						{product.productDetails.productPictures.map((thumb, index) => (
							<div className="thumbnail">
								<img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
							</div>
						))}
						{/* <div className="thumbnail active">
              {
                product.productDetails.productPictures.map((thumb, index) => 
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
              }
            </div> */}
					</div>
					<div className="productDescContainer">
						<div className="productDescImgContainer">
							<img
								src={generatePublicUrl(product.productDetails.productPictures[0].img)}
								alt={`${product.productDetails.productPictures[0].img}`}
							/>
						</div>

						{/* action buttons */}
						<div className="flexRow">
							<MaterialButton
								title="AJOUTER AU PANNIER"
								bgColor="#ff9f00"
								textColor="#ffffff"
								style={{
									marginRight: '15px',
									width: '220px'
								}}
								icon={<IoMdCart />}
								onClick={() => {
									const { _id, name, price } = product.productDetails;
									const img = product.productDetails.productPictures[0].img;
									dispatch(addToCartAction({ _id, name, price, img }));
									props.history.push(`/cart`);
								}}
							/>
							<MaterialButton
								title="ACHETER CECI"
								bgColor="#fb641b"
								textColor="#ffffff"
								style={{
									marginLeft: '15px',
									width: '220px'
								}}
								icon={<AiFillThunderbolt />}
							/>
						</div>
					</div>
				</div>
				<div>
					{/* home > category > subCategory > productName */}
					<div className="breed">
						<ul>
							<li>
								<a href="#">Home</a>
								<IoIosArrowForward />
							</li>
							<li>
								<a href="#">Mobiles</a>
								<IoIosArrowForward />
							</li>
							<li>
								<a href="#">Samsung</a>
								<IoIosArrowForward />
							</li>
							<li>
								<a href="#">{product.productDetails.name}</a>
							</li>
						</ul>
					</div>
					{/* product description */}
					<div className="productDetails">
						<h4 className="productTitle">{product.productDetails.name}</h4>
						<div>
							<span className="ratingCount">
								4.3 <IoIosStar />
							</span>
							<span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
						</div>
						<div className="extraOffer">Extra {formatter.format(4500)} off </div>
						<div className="flexRow priceContainer">
							<span className="price">{formatter.format(product.productDetails.price)}</span>
							<span className="discount" style={{ margin: '0 10px' }}>
								22% off
							</span>
							{/* <span>i</span> */}
						</div>
						<div>
							<p
								style={{
									color: '#212121',
									fontSize: '14px',
									fontWeight: '600'
								}}
							>
								Offres Disponibles
							</p>
							<p style={{ display: 'flex' }}>
								<span
									style={{
										width: '100px',
										fontSize: '15px',
										color: '#878787',
										fontWeight: '600',
										marginRight: '20px'
									}}
								>
									Description
								</span>
								<span
									style={{
										fontSize: '16px',
										marginRight: '20px',
										color: '#212121'
									}}
								>
									{product.productDetails.description}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
