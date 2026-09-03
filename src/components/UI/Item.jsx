import React from 'react';
import { Link } from 'react-router-dom';
import CountDown from './CountDown';
import Skeleton from './Skeleton';

const Item = ({
	authorId,
	authorImage,
	expiryDate,
	nftId,
	price,
	title,
	likes,
	nftImage,
	isLoading,
}) => {
	return (
		<div>
			<div className="nft__item">
				<div className="author_list_pp">
					{isLoading ? (
						<Skeleton
							width={'50px'}
							height={'50px'}
							borderRadius={'50%'}
						/>
					) : (
						<Link
							to={`/author/${authorId}`}
							data-bs-toggle="tooltip"
							data-bs-placement="top"
							title="Creator: Monica Lucas"
						>
							<img className="lazy" src={authorImage} alt="" />
							<i className="fa fa-check"></i>
						</Link>
					)}
				</div>

				{!isLoading && expiryDate && (
					<CountDown expireTime={expiryDate} />
				)}

				<div className="nft__item_wrap">
					{isLoading ? (
						<Link to="/">
							<Skeleton width={'100%'} height={'350px'} />
						</Link>
					) : (
						<>
							<div className="nft__item_extra">
								<div className="nft__item_buttons">
									<button>Buy Now</button>

									<div className="nft__item_share">
										<h4>Share</h4>

										<a
											href=""
											target="_blank"
											rel="noreferrer"
										>
											<i className="fa fa-facebook fa-lg"></i>
										</a>

										<a
											href=""
											target="_blank"
											rel="noreferrer"
										>
											<i className="fa fa-twitter fa-lg"></i>
										</a>

										<a href="">
											<i className="fa fa-envelope fa-lg"></i>
										</a>
									</div>
								</div>
							</div>

							<Link to={`/item-details/${nftId}`}>
								<img
									src={nftImage}
									className="lazy nft__item_preview"
									alt=""
								/>
							</Link>
						</>
					)}
				</div>

				<div className="nft__item_info">
					{isLoading ? (
						<>
							<Link to="/">
								<Skeleton height={'30px'} width={'180px'} />
							</Link>
							<Skeleton width={'100px'} height={'20px'} />

							<div className="nft__item_like">
								<Skeleton width={'30px'} height={'15px'} />
							</div>
						</>
					) : (
						<>
							<Link to={`/item-details/${nftId}`}>
								<h4>{title}</h4>
							</Link>

							<div className="nft__item_price">{price} ETH</div>

							<div className="nft__item_like">
								<i className="fa fa-heart"></i>
								<span>{likes}</span>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Item;
