import React from 'react';
import './Ratings.css'


const Rating = ({ value }) => {
	
	const starTotal = 5;
	const starPercentage = (value / starTotal) * 100;

	const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
	

	
	return (
		<div
			className="RatingContainer"
			style={{
				display: 'inline-block',
				background: '#388e3c',
				color: '#fff',
				fontWeight: '400',
				fontSize: '12px',
				borderRadius: '3px',
				padding: '2px 5px',
				margin: '10px auto'
			}}
		>
			  
          <div class="stars-outer">
				<div class="stars-inner"
					style={{
				
				width: starPercentageRounded
					}}>
					
			</div>
        </div>
<span className style={{
				color: '#fff',
			fontSize: '12px'
				
					}}>&nbsp; ({value})</span>
		</div>
	);

};



export default Rating;
