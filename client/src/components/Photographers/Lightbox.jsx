import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTimes,
	faAngleLeft,
	faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import "./lightbox.scss";

export default function Lightbox({
	openModal,
	closemodal,
	image,
	name,
	moveBackward,
	moveForward,
	onKeyPress,
}) {
	const closeCross = <FontAwesomeIcon icon={faTimes} />;
	const rightAngle = <FontAwesomeIcon icon={faAngleRight} />;
	const leftAngle = <FontAwesomeIcon icon={faAngleLeft} />;

	if (!openModal) {
		return null;
	}
	return (
		<div className="lightbox-background">
			<dialog
				aria-label="image closeup view"
				className="lightbox-container"
			>
				<button
					className="modal-cross"
					onClick={closemodal}
					aria-label="close dialog"
				>
					{closeCross}
				</button>

				<div className="left-arrow-container">
					<button
						id="back-btn"
						onClick={moveBackward}
						aria-label="previous image"
					>
						{leftAngle}
					</button>
				</div>

				<div className="img-container">
					{image.includes(".jpg") ? (
						<img
							id="lightbox-img"
							src={`../assets/${name}/compressed/${image}`}
							alt={image
								.replaceAll(".jpg", "")
								.replaceAll("_", " ")
								.replaceAll(/([A-Z]+)/g, " $1")
								.replaceAll(/(^\w|\s\w)/g, (m) =>
									m.toUpperCase()
								)}
							aria-label={image
								.replaceAll(".jpg", "")
								.replaceAll("_", " ")
								.replaceAll(/([A-Z]+)/g, " $1")
								.replaceAll(/(^\w|\s\w)/g, (m) =>
									m.toUpperCase()
								)}
						/>
					) : (
						<video
							controls
							src={`../assets/${name}/${image}`}
							type="video/mp4"
							alt={image
								.replaceAll(".jpg", "")
								.replaceAll(".mp4", "")
								.replaceAll("_", " ")
								.replaceAll(/([A-Z]+)/g, " $1")
								.replaceAll(/(^\w|\s\w)/g, (m) =>
									m.toUpperCase()
								)}
							aria-label={image
								.replaceAll(".jpg", "")
								.replaceAll(".mp4", "")
								.replaceAll("_", " ")
								.replaceAll(/([A-Z]+)/g, " $1")
								.replaceAll(/(^\w|\s\w)/g, (m) =>
									m.toUpperCase()
								)}
						/>
					)}
				</div>
				<div className="right-arrow-container">
					<button
						id="next-click"
						onClick={moveForward}
						aria-label="next image"
					>
						{rightAngle}
					</button>
				</div>
				<p className="img-title">
					{image
						.replaceAll(".jpg", "")
						.replaceAll(".mp4", "")
						.replaceAll("_", " ")
						.replaceAll(/([A-Z]+)/g, " $1")
						.replaceAll(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
				</p>
			</dialog>
		</div>
	);
}
