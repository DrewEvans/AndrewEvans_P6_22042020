import "./landingHeader.scss";

const profileImage = {
	height: "200px",
	width: "200px",
	objectFit: "cover",
	borderRadius: "50%",
};

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
				<button>Contactez-moi</button>
			</div>
			<div className="profileImg-container">
				<img
					className="profile-pic"
					// style={profileImage}
					src={`../assets/Photographers ID Photos/${portrait}`}
					alt=""
				/>
			</div>
		</div>
	);
};

export default LandingHeader;
