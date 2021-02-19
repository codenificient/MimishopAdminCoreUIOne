import React, { useEffect, useState } from 'react';
import { AiFillThunderbolt } from 'react-icons/ai';
import { IoIosArrowForward, IoIosStar, IoMdCart } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, getProductDetailsById } from '../../actions';
import Layout from '../../components/Layout';
import { Breed, MaterialButton } from '../../components/MaterialUI';
import Card from '../../components/UI/Card';
import Rating from '../../components/UI/Rating';
import { formatter, generatePublicUrl } from '../../urlConfig';
import './style.css';

export default function ProductDetailsPage(props) {
	const product = useSelector((state) => state.product);
	const [ indexShow, setIndexShow ] = useState(0);
	const [ isActive, setActive ] = useState({
		activeObject: indexShow
	});
	const dispatch = useDispatch();

	const toggleClass = (index) => {
		setActive({ ...isActive, activeObject: index });
		setIndexShow(index);
	};

	const toggleActiveStyles = (index) => {
		if (index === isActive.activeObject) {
			return 'thumbnail activeImg';
		} else {
			return 'thumbnail';
		}
	};

	useEffect(() => {
		const { productId } = props.match.params;
		const payload = {
			params: {
				productId
			}
		};
		dispatch(getProductDetailsById(payload));
	}, []);

	useEffect(() => {
		document.title = 'Détails du Produit - MimiShop'
	}, [])

	if (Object.keys(product.productDetails).length === 0) {
		return null;
	}

	return (
		<Layout>
			{/* <div>{product.productDetails.name}</div> */}
				<div
				style={{
					maxWidth: '1600px',
					margin: '30px auto'
				}}
			>
			<Card
				style={{
					margin: '20px auto'
				}}
			>
				<div className="productDescriptionContainer">
					<div className="flexRow">
						<div className="verticalImageStack">
							{product.productDetails.productPictures.map((thumb, index) => (
								<div
									key={index}
									className={toggleActiveStyles(index)}
									onClick={() => {
										toggleClass(index);
									}}
								>
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
								{
									<img
										src={generatePublicUrl(product.productDetails.productPictures[indexShow].img)}
										alt={`${product.productDetails.productPictures[indexShow].img}`}
									/>
								}
							</div>

							{/* action buttons */}
							<div className="flexRow">
								<MaterialButton
									title="AJOUT AU PANNIER"
									bgColor="#ff9f00"
									textColor="#ffffff"
									style={{
										marginRight: '14px',
										minWidth: '200px'
									}}
									icon={<IoMdCart />}
									onClick={() => {
										const { _id, name, price, deliveryFee } = product.productDetails;
										const img = product.productDetails.productPictures[0].img;
										dispatch(addToCartAction({ _id, name, price, img, deliveryFee }));
										props.history.push(`/cart`);
									}}
								/>
								<MaterialButton
									title="ACHETER CECI"
									bgColor="#fb641b"
									textColor="#ffffff"
									style={{
										marginLeft: '14px',
										minWidth: '200px'
									}}
									icon={<AiFillThunderbolt />}
								/>
							</div>
						</div>
					</div>
					<div>
						{/* home > category > subCategory > productName */}
						<Breed
							breed={[
								{
									name: 'Accueil',
									href: '/'
								},
								{
									name: 'Mobiles',
									href: '/mobiles/'
								},
								{
									name: product.productDetails.name.split(' ')[0],
									href: `/${product.productDetails.name.split(' ')[0]}?cid=${product.productDetails
										.category}&type=store`
								},
								{
									name: product.productDetails.name,
									href: `/${product.productDetails.slug}/${product.productDetails._id}/p`
								}
							]}
							breedIcon={<IoIosArrowForward />}
						/>

						{/* product description */}
						<div className="productDetails">
							<h3 className="productTitle">{product.productDetails.name}</h3>
								<div className="ratingsContainer">
									<Rating value="4.2" />
								
								<span className="ratingNumbersReviews">72,234 Evaluations & 8,140 Critiques</span>
							</div>
							<div className="extraOffer">Extra {formatter.format(4500)} de rabais </div>
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

								<div
									style={{
										fontSize: '20px',
										color: '#177c7c',
										fontWeight: '600',
										margin: '25px 0'
									}}
								>
									<span
										style={{
											fontSize: '15px',

											fontWeight: '600',
											marginRight: '20px'
										}}
									>
										Frais de Livraison
									</span>&nbsp;{product.productDetails.deliveryFee ? (
										formatter.format(product.productDetails.deliveryFee)
									) : (
										'GRATUIT'
									)}
								</div>
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
				</Card>
			</div>
		</Layout>
	);
}
