import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../actions';
import './style.css';

export default function MenuHeader() {
	const category = useSelector((state) => state.category);
	const dispatch = useDispatch('');

	useEffect(() => {
		dispatch(getAllCategories());
	}, []);

	const renderCategories = (categories) => {
		let Categories = [];
		for (let category of categories) {
			Categories.push(
				<li key={category._id}>
					{category.parentId ? (
						<a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a>
					) : (
						<span>{category.name}</span>
					)}

					{category.children.length > 0 ? <ul>{renderCategories(category.children)}</ul> : null}
				</li>
			);
		}
		return Categories;
	};

	return (
		<div className="menuheader">
			<ul key={category._id}>{category.categories.length > 0 ? renderCategories(category.categories) : []}</ul>
		</div>
	);
}
