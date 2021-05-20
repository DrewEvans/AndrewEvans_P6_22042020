const imageSizes = {
	height: "300px",
	width: "300px",
	objectFit: "cover",
	borderRadius: "5px",
};

const Media = ({
	id,
	name,
	tags,
	image,
	video,
	likes,
	date,
	contentId,
	key,
}) => {
	return (
		<>
			<div>
				{image && (
					<div>
						<div className="col-4 d-flex flex-column">
							<img
								key={key}
								style={imageSizes}
								src={`../assets/${name}/${image}`}
								alt=""
							/>
							<div className="">
								<p className="">
									{image
										.replaceAll(".jpg", "")
										.replaceAll("_", " ")}
								</p>
								<i className="">{likes}</i>
								<span className=""></span>
							</div>
						</div>
					</div>
				)}
				{video && (
					<div className="col-4 d-flex flex-column">
						<video
							controls
							width="300"
							src={`../assets/${name}/${video}`}
							type="video/mp4"
						/>
						<div className="">
							<p>
								{video
									.replaceAll(".mp4", "")
									.replaceAll("_", " ")}
							</p>
							<i>{likes}</i>
							<span></span>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Media;
