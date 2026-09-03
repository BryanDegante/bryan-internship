import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from './Skeleton';

const HotCollectionsCard = ({
	nftId,
	nftImage,
	authorId,
	authorImage,
	title,
	code,
	isLoading,
}) => {
	return (
		<div>
			<div className="nft_coll">
				<div className="nft_wrap">
					<Link to={`item-details/${nftId}`}>
						{isLoading ? (
							<Skeleton width={'100%'} height={'200px'} />
						) : (
							<img
								src={nftImage}
								className="lazy img-fluid"
								alt=""
							/>
						)}
					</Link>
				</div>
				<div className="nft_coll_pp">
					<Link to={`/author/${authorId}`}>
						{isLoading ? (
							<>
								<Skeleton
									width={'50px'}
									height={'50px'}
									borderRadius={'50%'}
								/>

							</>
						) : (
							<img
								className="lazy pp-coll"
								src={authorImage}
								alt=""
							/>
						)}
					</Link>
					<i className="fa fa-check"></i>
				</div>
				<div className="nft_coll_info">
					{isLoading ? (
						<>
							<Skeleton width={'100px'} height={'20px'} />
							<br />
							<Skeleton width={'60px'} height={'20px'} />
						</>
					) : (
						<>
							<Link to="/explore">
								<h4>{title}</h4>
							</Link>
							<span>ERC-{code}</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default HotCollectionsCard;
