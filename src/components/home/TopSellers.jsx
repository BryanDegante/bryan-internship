import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SellerCard from '../UI/SellerCard';

const TopSellers = () => {
	const [sellers, setSellers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		async function getSellers() {
			const { data } = await axios.get(
				'https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers',
			);

			setSellers(data);
			setIsLoading(false);
		}
		getSellers();
	}, []);
	return (
		<section id="section-popular" className="pb-5">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="text-center">
							<h2>Top Sellers</h2>
							<div className="small-border bg-color-2"></div>
						</div>
					</div>
					<div className="col-md-12">
						<ol className="author_list">
							{isLoading
								? [...Array(12)].map((_, index) => (
										<SellerCard key={index} isLoading/>
									))
								: sellers.map((seller, index) => (
									<SellerCard key={index} authorId={seller.authorId} authorImage={seller.authorImage} authorName={seller.authorName} price={seller.price}/>
									))}
						</ol>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TopSellers;
