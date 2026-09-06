import React, { useEffect, useState } from 'react';
import AuthorBanner from '../images/author_banner.jpg';
import AuthorItems from '../components/author/AuthorItems';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '../components/UI/Skeleton';

const Author = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [author, setAuthor] = useState({});
	const { id } = useParams();
	const [followerCount, setFollowerCount] = useState(0);
	const [ isFollowing, setIsFollowing ] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		async function getAuthor() {
			const { data } = await axios.get(
				`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
			);
			setAuthor(data);
			setFollowerCount(data.followers);
			setIsLoading(false);
		}
		getAuthor();
	}, [id]);

	function handleFollow() {
		if (isFollowing) {
			setFollowerCount((prev) => prev - 1);
		} else {
			setFollowerCount((prev) => prev + 1);
		}
		setIsFollowing((prev) => !prev);
	}

	return (
		<div id="wrapper">
			<div className="no-bottom no-top" id="content">
				<div id="top"></div>

				<section
					id="profile_banner"
					aria-label="section"
					className="text-light"
					data-bgimage="url(images/author_banner.jpg) top"
					style={{ background: `url(${AuthorBanner}) top` }}
				></section>

				<section aria-label="section">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="d_profile de-flex">
									<div className="de-flex-col">
										<div className="profile_avatar">
											{isLoading ? (
												<Skeleton
													width={'150px'}
													height={'150px'}
													borderRadius={'50%'}
												/>
											) : (
												<img
													src={author.authorImage}
													alt=""
												/>
											)}

											<i className="fa fa-check"></i>
											<div className="profile_name">
												<h4>
													{isLoading ? (
														<Skeleton
															width={'200px'}
														/>
													) : (
														author.authorName
													)}
													<span className="profile_username">
														{isLoading ? (
															<Skeleton
																width={'100px'}
															/>
														) : (
															author.tag
														)}
													</span>
													<span
														id="wallet"
														className="profile_wallet"
													>
														{isLoading ? (
															<Skeleton
																width={'250px'}
															/>
														) : (
															author.address
														)}
													</span>
													{!isLoading && (
														<button
															id="btn_copy"
															title="Copy Text"
														>
															Copy
														</button>
													)}
												</h4>
											</div>
										</div>
									</div>
									<div className="profile_follow de-flex">
										<div className="de-flex-col">
											<div className="profile_follower">
												{!isLoading &&
													`${followerCount} followers`}
											</div>
											{isLoading ? (
												<Skeleton
													width={'150px'}
													height={'40px'}
												/>
											) : (
												<Link
													to="#"
													onClick={handleFollow}
													className="btn-main"
												>
													{isFollowing
														? 'Unfollow'
														: 'Follow'}
												</Link>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className="col-md-12">
								<div className="de_tab tab_simple">
									<AuthorItems
										items={author.nftCollection}
										image={author.authorImage}
										id={author.authorId}
										isLoading={isLoading}
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Author;
