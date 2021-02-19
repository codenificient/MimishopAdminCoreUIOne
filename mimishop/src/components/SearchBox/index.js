import React from 'react';
import { IoMdSearch } from 'react-icons/io';


const SearchBox = (props) => {
	return (
		<div
			style={{
				padding: '0 10px'
			}}
		>
			<div className="searchInputContainer">
				<input
					className="searchInput"
					placeholder={'rechercher les produits, marques, boutiques et plus'}
					onChange={props.handleChange}
				/>
				<div className="searchIconContainer" onChange={props.handleSearch}>
					<IoMdSearch
						style={{
							color: 'rgb(7,155,155)',
							width: '30px',
							height: '30px'
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default SearchBox;
