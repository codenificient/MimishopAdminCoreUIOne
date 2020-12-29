import React from 'react';
import { formatter } from '../../urlConfig';
import Card from '../UI/Card';

export default function PriceDetails(props) {
	return (
		<Card headerLeft={'Détailles du Prix'} style={{ maxWidth: '380px' }}>
			<div
				style={{
					padding: '20px',
					boxSizing: 'border-box'
				}}
			>
				<div className="flexRow sb" style={{ margin: '10px 0' }}>
					<div>Prix ({props.totalItem} articles)</div>
					<div>{formatter.format(props.subTotal)}</div>
				</div>
				<div className="flexRow sb" style={{ margin: '10px 0' }}>
					<div>Charges de Livraison</div>
					<div>{props.deliveryFee ? formatter.format(props.deliveryFee) : 'GRATUIT'}</div>
				</div>

				<div className="flexRow sb" style={{ margin: '10px 0' }}>
					<div>Montant Total</div>
					<div>
						{formatter.format(props.deliveryFee ? props.subTotal + props.deliveryFee : props.subTotal)}
					</div>
				</div>
			</div>
		</Card>
	);
}
