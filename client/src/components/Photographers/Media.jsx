import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./media.scss";

const Media = ({
	index,
	id,
	name,
	tags,
	image,
	video,
	likes,
	date,
	contentId,
	key,
	openmodal,
	onKeyPress,
}) => {
	const [userLikes, setUserLikes] = useState(likes);
	const heartIcon = <FontAwesomeIcon icon={faHeart} />;

	return (
		<>
			{image && (
				<div className="media-card">
					{/* <Image
							key={key}
							style={imageSizes}
							src={`../assets/${name}/${image}`}
							width={200}
							height={200}
						/> */}
					<div
						onClick={openmodal}
						onKeyPress={onKeyPress}
						value="current"
						className="content-backdrop"
						aria-label="image-closeup-view"
						aria-selected="true"
						role="tab"
						tabIndex={index}
					>
						<img
							id="img-display"
							key={key}
							src={`../assets/${name}/compressed/${image}`}
							alt={image}
						/>
					</div>
					<div className="media-details">
						<p className="content-title">
							{image
								.replaceAll(".jpg", "")
								.replaceAll("_", " ")
								.replaceAll(/([A-Z]+)/g, " $1")
								.replaceAll(/(^\w|\s\w)/g, (m) =>
									m.toUpperCase()
								)}
						</p>
						<div className="likes-container">
							<i className="likes">{userLikes}</i>
							<span
								onClick={() => setUserLikes(userLikes + 1)}
								className="heart-icon"
							>
								{heartIcon}
							</span>
						</div>
					</div>
				</div>
			)}
			{video && (
				<div className="media-card">
					<div className="content-backdrop">
						<video
							controls
							src={`../assets/${name}/${video}`}
							type="video/mp4"
							alt={video}
						/>
					</div>
					<div className="media-details">
						<p className="content-title">
							{video
								.replaceAll(".mp4", "")
								.replaceAll("_", " ")
								.replaceAll(/([A-Z]+)/g, " $1")
								.trim()}
						</p>
						<div className="likes-container">
							<i className="likes">{userLikes}</i>
							<span
								onClick={() => setUserLikes(userLikes + 1)}
								className="heart-icon"
							>
								{heartIcon}
							</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Media;
