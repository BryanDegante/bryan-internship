import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HotCollectionsCard from '../UI/HotCollectionsCard';

const HotCollections = () => {
	const [collectionsData, setCollectionsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getNft() {
			const { data } = await axios.get(
				`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`,
			);

			setCollectionsData(data);
			setIsLoading(false);
		}
		getNft();
	}, []);

	const options = {
		nav: true,
		loop: true,
		items: 4,
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
		<section id="section-collections" className="no-bottom">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="text-center">
							<h2>Hot Collections</h2>
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
									<HotCollectionsCard key={index} isLoading />
								))
							: collectionsData.map((nft, index) => (
									<HotCollectionsCard
										key={index}
										nftId={nft.nftId}
										nftImage={nft.nftImage}
										authorId={nft.authorId}
										authorImage={nft.authorImage}
										title={nft.title}
										code={nft.code}
									/>
								))}
					</OwlCarousel>
				</div>
			</div>
		</section>
	);
};

export default HotCollections;
