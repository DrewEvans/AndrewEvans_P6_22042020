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
					{
						//if tags present loop and display photographer tags
						tags
							? tags.map((tag, i) => {
									return (
										<div
											className="tags"
											key={i}
											aria-label={`tag ${tag}`}
										>
											#{tag}
										</div>
									);
							  })
							: "Loading..."
					}
				</div>
			</div>
			<div className="btn-container">
				<button onClick={() => setIsOpen(true)} aria-label="contact me">
					Contactez-moi
				</button>
			</div>
			<ContactModal
				//render conatact modal if isOpen state is true
				open={isOpen}
				//if onClose is called state is changed to false
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
