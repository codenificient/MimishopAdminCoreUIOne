import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../actions';
import './style.css';

export default function MenuHeader() {
	const category = useSelector((state) => state.category);
	const dispath = useDispatch('');

	useEffect(() => {
		dispath(getAllCategories());
	}, []);

	const renderCategories = (categories) => {
		let Categories = [];
		for (let category of categories) {
			Categories.push(
				<li>
					{category.parentId ? <a href={category.slug}>{category.name}</a> : <span>{category.name}</span>}

					{category.children.length > 0 ? <ul>{renderCategories(category.children)}</ul> : null}
				</li>
			);
		}
		return Categories;
	};

	return (
		<div className="menuheader">
			<ul>{category.categories.length > 0 ? renderCategories(category.categories) : []}</ul>
			<h1>Menu Header</h1>
		</div>
	);
}
