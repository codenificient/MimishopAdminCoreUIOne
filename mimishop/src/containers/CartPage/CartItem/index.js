import React, { useState } from 'react';
import { formatter, generatePublicUrl } from '../../../urlConfig';
import './style.css';

export default function CartItem(props) {
	const { _id, name, price, img } = props.cartItem;
	const [ qty, setQty ] = useState(props.cartItem.qty);

	const onQuantityIncrement = () => {
		setQty(qty + 1);
		props.onQuantityInc(_id, qty + 1);
	};
	const onQuantityDecrement = () => {
		if (qty <= 1) return;
		setQty(qty - 1);
		props.onQuantityDec(_id, qty - 1);
	};


	return (
		<div className="cartItemContainer">
			<div className="flexRow">
				<div className="cartProImgContainer">
					<img src={generatePublicUrl(img)} alt={name} />
				</div>
				<div className="cartItemDetails">
					<div>
						<p className="cartItemNames">{name}</p>
						<p>{formatter.format(price)}</p>
					</div>
					<div>Livraison dans 3-5 jours</div>
				</div>
			</div>

			<div
				style={{
					display: 'flex',
					margin: '12px 10px'
				}}
			>
				<div className="quantityControl">
					<button onClick={onQuantityDecrement}>-</button>
					<input value={qty} onChange={(e) => setQty(e.target.value)} />
					<button onClick={onQuantityIncrement}>+</button>
				</div>
				<button className="cartActionBtn">sauvegarder sur liste</button>
				<button className="cartActionBtn">Supprimer</button>
			</div>
			<hr />
		</div>
	);
}
