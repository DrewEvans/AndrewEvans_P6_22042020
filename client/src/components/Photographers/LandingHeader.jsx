import { useState } from "react";
import ContactModal from "./ContactModal";
import "./landingHeader.scss";

const LandingHeader = ({
	photographer,
	name,
	tags,
	city,
	country,
	tagline,
	portrait,
	id,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="header-container">
			<div className="photographer-details">
				<h1>{name}</h1>

				<p className="location">
					{city}, {country}
				</p>
				<p className="tagline">{tagline}</p>

				<div className="tag-container">
					{tags
						? tags.map((tag, i) => {
								return (
									<div className="tags" key={i}>
										#{tag}
									</div>
								);
						  })
						: "Loading..."}
				</div>
			</div>
			<div className="btn-container">
				<button onClick={() => setIsOpen(true)}>Contactez-moi</button>
			</div>
			<ContactModal
				open={isOpen}
				onClose={() => setIsOpen(false)}
				name={name}
				id={id}
			/>
			<div className="profileImg-container">
				<img
					className="profile-pic"
					src={`../assets/Photographers ID Photos/compressed/${portrait}`}
					alt=""
				/>
			</div>
		</div>
	);
};

export default LandingHeader;
