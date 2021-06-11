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
			{
				//if image is present render a <img> media card
				image && (
					<div className="media-card">
						<div
							//if user clicks on image render call openModal
							onClick={openmodal}
							//call onKeyPress if user interacts with image
							onKeyPress={onKeyPress}
							value="current"
							className="content-backdrop"
							aria-label={`${image
								.replaceAll(".jpg", "")
								.replaceAll("_", " ")
								.replaceAll(/([A-Z]+)/g, " $1")
								.replaceAll(/(^\w|\s\w)/g, (m) =>
									m.toUpperCase()
								)}, closeup view`}
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
									//if user clicks on icon increment likes by 1
									onClick={() => setUserLikes(userLikes + 1)}
									className="heart-icon"
								>
									{heartIcon}
								</span>
							</div>
						</div>
					</div>
				)
			}
			{
				//if video is present render a <video> media card
				video && (
					<div className="media-card">
						<div
							className="content-backdrop"
							aria-label={`${video
								.replaceAll(".mp4", "")
								.replaceAll("_", " ")
								.replaceAll(/([A-Z]+)/g, " $1")
								.replaceAll(/(^\w|\s\w)/g, (m) =>
									m.toUpperCase()
								)}, closeup view`}
						>
							<video
								controls
								src={`../assets/${name}/compressed/${video}`}
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
									//if user clicks on icon increment likes by 1
									onClick={() => setUserLikes(userLikes + 1)}
									className="heart-icon"
								>
									{heartIcon}
								</span>
							</div>
						</div>
					</div>
				)
			}
		</>
	);
};

export default Media;
