import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Item from '../UI/Item';

const NewItems = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [newItemsData, setNewItemsData] = useState([]);

	useEffect(() => {
		async function getItems() {
			const { data } = await axios.get(
				`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`,
			);

			setNewItemsData(data);
			setIsLoading(false);
		}

		getItems();
	}, []);

	const options = {
		nav: true,
		items: 4,
		loop: true,
		margin: 10,
		dots: false,
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 2,
			},
			1024: {
				items: 3,
			},
			1440: {
				items: 4,
			},
		},
	};

	return (
		<section id="section-items" className="no-bottom">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="text-center">
							<h2>New Items</h2>
							<div className="small-border bg-color-2"></div>
						</div>
					</div>
					<OwlCarousel
						className="owl-theme"
						{...options}
						key={isLoading ? 'loading' : 'loaded'}
					>
						{isLoading
							? [...Array(6)].map((_, index) => (
									<Item key={index} isLoading />
								))
							: newItemsData.map((item) => (
									<Item
										key={item.nftId}
										nftId={item.nftId}
										authorId={item.authorId}
										authorImage={item.authorImage}
										nftImage={item.nftImage}
										price={item.price}
										likes={item.likes}
										title={item.title}
										expiryDate={item.expiryDate}
									/>
								))}
					</OwlCarousel>
				</div>
			</div>
		</section>
	);
};

export default NewItems;
