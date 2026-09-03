import React from 'react';
import { Link } from 'react-router-dom';

const SellerCard = ({
	authorId,
	authorImage,
	authorName,
	price,
	isLoading,
}) => {
	return (
		<li>
			<div className="author_list_pp">
				<Link to={`/author/${authorId}`}>
					{isLoading ? (
						<>
							<div
								className="skeleton-box"
								style={{
									width: '50px',
									height: '50px',
									borderRadius: '50%',
								}}
							/>
							<i className="fa fa-check"></i>
						</>
					) : (
						<>
							<img
								className="lazy pp-author"
								src={authorImage}
								alt=""
							/>
							<i className="fa fa-check"></i>
						</>
					)}
				</Link>
			</div>
			<div className="author_list_info">
				{isLoading ? (
					<>
						<Link to="/">
							<div
								className="skeleton-box"
								style={{
									width: '100px',
									height: '20px',
								}}
							/>
						</Link>
						<span>
							<div
								className="skeleton-box"
								style={{
									width: '40px',
									height: '20px',
								}}
							/>
						</span>
					</>
				) : (
					<>
						<Link to={`/author/${authorId}`}>{authorName}</Link>
						<span>{price} ETH</span>
					</>
				)}
			</div>
		</li>
	);
};

export default SellerCard;
