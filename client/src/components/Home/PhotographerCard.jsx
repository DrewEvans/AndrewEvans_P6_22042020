import { NavLink } from "react-router-dom";
import "./photographercard.scss";

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
	//renders the photographer cards on the homepage with the props passed from home component
	return (
		<>
			<div className="card-container">
				<NavLink
					to={`/photographers/${id}`}
					style={{ textDecoration: "none" }}
				>
					<div className="img-container">
						<img
							src={`../assets/Photographers ID Photos/compressed/${portrait}`}
							alt={name}
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
							<span
								className="tags"
								key={i}
								aria-label={tag}
								aria-required="true"
							>
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
