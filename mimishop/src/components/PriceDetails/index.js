import React from 'react';
import { formatter } from '../../urlConfig';
import Card from '../UI/Card';

export default function PriceDetails(props) {
	return (
		<Card headerLeft={`Détailles du Prix`} style={{ maxWidth: '380px', padding: '20px', fontWeight: 'bolder' }}>
			<div
				style={{
					padding: '20px',
					boxSizing: 'border-box',
					fontWeight: 'normal'
				}}
			>
				<div className="flexRow sb" style={{ margin: '10px 0' }}>
					<div>Prix ({props.totalItem} articles)</div>
					<div>{formatter.format(props.subTotal)}</div>
				</div>
				<div className="flexRow sb" style={{ margin: '10px 0' }}>
					<div>Charges de Livraison</div>
					<div>{props.delivery ? formatter.format(props.delivery) : 'GRATUIT'}</div>
				</div>

				<div className="flexRow sb" style={{ margin: '10px 0' }}>
					<div>Montant Total</div>
					<div>{formatter.format(props.delivery ? props.subTotal + props.delivery : props.subTotal)}</div>
				</div>
			</div>
		</Card>
	);
}
