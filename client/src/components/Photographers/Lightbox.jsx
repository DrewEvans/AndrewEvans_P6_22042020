import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTimes,
	faAngleLeft,
	faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import "./lightbox.scss";

export default function Lightbox({ openmodal, closemodal, image }) {
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
				<span>{leftAngle}</span>
			</div>
			{/* <h1>I am lightbox hear me roar</h1> */}
			<div className="img-container">
				<img src={image} alt="" />
			</div>
			<div className="right-arrow-container">
				<span>{rightAngle}</span>
			</div>
		</div>
	);
}
