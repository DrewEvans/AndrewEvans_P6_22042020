import { NavLink } from "react-router-dom";
import "./photographercard.scss";

const imageSizes = {
	height: "200px",
	width: "200px",
	objectFit: "cover",
	borderRadius: "50%",
};

const PhotographerCard = ({
	name,
	city,
	country,
	price,
	tags,
	tagline,
	id,
	portrait,
}) => {
	return (
		<>
			<div className="card-container">
				<NavLink to={`/photographer/${id}`}>
					<div className="img-container">
						<img
							style={imageSizes}
							src={`../assets/Photographers ID Photos/${portrait}`}
							alt=""
						/>
					</div>
					<div className="photographer-details">
						<h2 className="name">{name}</h2>
						<p className="location">
							{city}, {country}
						</p>
					</div>
				</NavLink>
				<p className="tagline">{tagline}</p>
				<p className="price">{price}€/jour</p>
				<div className="tags-container">
					{tags.map((tag, i) => {
						return (
							<span className="tags" key={i}>
								#{tag}
							</span>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default PhotographerCard;
