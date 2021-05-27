import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTimes,
	faAngleLeft,
	faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import "./lightbox.scss";

export default function Lightbox({
	openmodal,
	closemodal,
	image,
	name,
	moveBackward,
	moveForward,
}) {
	const closeCross = <FontAwesomeIcon icon={faTimes} />;
	const rightAngle = <FontAwesomeIcon icon={faAngleRight} />;
	const leftAngle = <FontAwesomeIcon icon={faAngleLeft} />;

	if (!openmodal) {
		return null;
	}
	return (
		<div className="lightbox-container">
			<button className="modal-cross" onClick={closemodal}>
				{closeCross}
			</button>

			<div className="left-arrow-container">
				<span id="back-btn" onClick={moveBackward}>
					{leftAngle}
				</span>
			</div>
			{/* <h1>I am lightbox hear me roar</h1> */}

			<div className="img-container">
				<img
					id="lightbox-img"
					src={`../assets/${name}/compressed/${image}`}
					alt=""
				/>
			</div>
			<div className="right-arrow-container">
				<span id="next-click" onClick={moveForward}>
					{rightAngle}
				</span>
			</div>
			<p className="img-title">
				{image
					.replaceAll(".jpg", "")
					.replaceAll("_", " ")
					.replaceAll(/([A-Z]+)/g, " $1")
					.replaceAll(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
			</p>
		</div>
	);
}
