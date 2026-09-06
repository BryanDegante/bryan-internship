import Item from '../UI/Item';

const AuthorItems = ({ items, image, id , isLoading}) => {
	return (
		<div className="de_tab_content">
			<div className="tab-1">
				<div className="row">
					{isLoading ? ([...Array(8)].map((_,index) => (
						<div
							className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
							key={index}
						>
							<Item isLoading />
							</div>
					))):( items.map((item, index) => (
						<div
							className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
							key={index}
						>
							<Item
								authorId={id}
								authorImage={image}
								nftId={item.nftId}
								price={item.price}
								title={item.title}
								likes={item.likes}
								nftImage={item.nftImage}
							/>
						</div>
					)))}
				</div>
			</div>
		</div>
	);
};

export default AuthorItems;
