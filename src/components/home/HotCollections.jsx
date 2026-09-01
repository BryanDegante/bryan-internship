import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

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
					{isLoading ? (
						<OwlCarousel
							className="owl-theme"
							{...options}
							key={isLoading ? 'loading' : 'loaded'}
						>
							{[...Array(6)].map((_, index) => (
								<div key={index}>
									<div className="nft_coll">
										<div className="nft_wrap">
											<Link to="/">
												<div
													className="skeleton-box"
													style={{
														width: '100%',
														height: '200px',
													}}
												/>
											</Link>
										</div>
										<div className="nft_coll_pp">
											<Link to="/">
												<div
													className="skeleton-box"
													style={{
														width: '50px',
														height: '50px',
														borderRadius: '50%',
													}}
												/>
											</Link>
											<i className="fa fa-check"></i>
										</div>
										<div className="nft_coll_info">
											<Link to="/">
												<div
													className="skeleton-box"
													style={{
														width: '100px',
														height: '20px',
													}}
												></div>
											</Link>
											<br />
											<div
												className="skeleton-box"
												style={{
													width: '60px',
													height: '20px',
												}}
											></div>
										</div>
									</div>
								</div>
							))}
						</OwlCarousel>
					) : (
						<OwlCarousel
							className="owl-theme"
							{...options}
							key={isLoading ? 'loading' : 'loaded'}
						>
							{collectionsData.map((nft, index) => (
								<div key={index}>
									<div className="nft_coll">
										<div className="nft_wrap">
											<Link to={`item-details/${nft.nftId}`}>
												<img
													src={nft.nftImage}
													className="lazy img-fluid"
													alt=""
												/>
											</Link>
										</div>
										<div className="nft_coll_pp">
											<Link
												to={`/author/${nft.authorId}`}
											>
												<img
													className="lazy pp-coll"
													src={nft.authorImage}
													alt=""
												/>
											</Link>
											<i className="fa fa-check"></i>
										</div>
										<div className="nft_coll_info">
											<Link to="/explore">
												<h4>{nft.title}</h4>
											</Link>
											<span>ERC-{nft.code}</span>
										</div>
									</div>
								</div>
							))}
						</OwlCarousel>
					)}
				</div>
			</div>
		</section>
	);
};

export default HotCollections;
