import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Item from '../UI/Item';

const ExploreItems = () => {
	const [exploreItems, setExploreItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [itemsToShow, setItemsToShow] = useState(8);

	useEffect(() => {
		getExploreItems();
	}, []);
	
	async function getExploreItems() {
		const { data } = await axios.get(
			'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore',
		);
		setExploreItems(data);
		setIsLoading(false);
	}
	function loadMore() {
		setItemsToShow((prev) => prev + 4);
	}

	async function filterItems(option) {
		if (option === '') {
			getExploreItems();
			return;
		}
		const { data } = await axios.get(
			`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${option}`,
		);
		setExploreItems(data);
		setIsLoading(false);
	}

	return (
		<>
			<div>
				<select id="filter-items" defaultValue="" onChange={(event) => {
					filterItems(event.target.value);
				} }>
					<option value="">Default</option>
					<option value="price_low_to_high">
						Price, Low to High
					</option>
					<option value="price_high_to_low">
						Price, High to Low
					</option>
					<option value="likes_high_to_low">Most liked</option>
				</select>
			</div>
			{isLoading
				? [...Array(8)].map((_, index) => (
						<div
							key={index}
							className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
							style={{
								display: 'block',
								backgroundSize: 'cover',
							}}
						>
							<Item isLoading />
						</div>
					))
				: exploreItems.slice(0, itemsToShow).map((item, index) => (
						<div
							key={index}
							className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
							style={{
								display: 'block',
								backgroundSize: 'cover',
							}}
						>
							<Item
								authorId={item.authorId}
								authorImage={item.authorImage}
								expiryDate={item.expiryDate}
								nftId={item.nftId}
								price={item.price}
								title={item.title}
								likes={item.likes}
								nftImage={item.nftImage}
							/>
						</div>
					))}
			<div className="col-md-12 text-center">
				{exploreItems.length > itemsToShow ? (
					<Link
						to=""
						onClick={loadMore}
						id="loadmore"
						className="btn-main lead"
					>
						Load more
					</Link>
				) : (
					''
				)}
			</div>
		</>
	);
};

export default ExploreItems;
