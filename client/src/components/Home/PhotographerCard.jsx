import { NavLink } from "react-router-dom";

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
			<div>
				<NavLink to={`/photographer/${id}`}>
					<div>
						<img
							style={imageSizes}
							src={`../assets/Photographers ID Photos/${portrait}`}
							alt=""
						/>
					</div>
					<div>
						<h2>{name}</h2>
						<p>
							{city}, {country}
						</p>
					</div>
				</NavLink>
			</div>
			<div>
				<p>{tagline}</p>
				<p>{price}€/jour</p>
				<div>
					{tags.map((tag, i) => {
						return <span key={i}>#{tag}</span>;
					})}
				</div>
			</div>
		</>
	);
};

export default PhotographerCard;
