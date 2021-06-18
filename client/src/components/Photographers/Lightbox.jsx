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
}) {
	const closeCross = <FontAwesomeIcon icon={faTimes} />;
	const rightAngle = <FontAwesomeIcon icon={faAngleRight} />;
	const leftAngle = <FontAwesomeIcon icon={faAngleLeft} />;

	//render lightbox component if openModal state is true
	if (!openModal) {
		return null;
	}
	return (
		<div
			className="lightbox-background"
			onKeyDown={document.addEventListener("keydown")}
		>
			<dialog
				aria-label="image closeup view"
				className="lightbox-container"
			>
				<button
					className="modal-cross"
					//calls closeModal function and sets state to false
					onClick={closemodal}
					aria-label="close dialog"
				>
					{closeCross}
				</button>

				<div className="left-arrow-container">
					<button
						id="back-btn"
						//event listener to when user clicks on the button
						onClick={moveBackward}
						aria-label="previous image"
					>
						{leftAngle}
					</button>
				</div>

				<div className="img-container">
					{
						//if image is .jpg file display <img> card
						image.includes(".jpg") ? (
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
							// else display <video> card
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
						)
					}
				</div>
				<div className="right-arrow-container">
					<button
						id="next-click"
						//event listener to when user clicks on the button
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
