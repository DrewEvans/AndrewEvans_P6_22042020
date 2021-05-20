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
		<>
			<div>
				<h1>{name}</h1>

				<p>
					{city}, {country}
				</p>
				<p>{tagline}</p>

				<div>
					{tags
						? tags.map((tag, i) => {
								return <div key={i}>{tag}</div>;
						  })
						: "Loading..."}
				</div>
				<button>Contactez-moi</button>
				<div>
					<img
						style={profileImage}
						src={`../assets/Photographers ID Photos/${portrait}`}
						alt=""
					/>
				</div>
			</div>
		</>
	);
};

export default LandingHeader;
