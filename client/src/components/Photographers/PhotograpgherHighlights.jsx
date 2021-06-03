import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./photographerHighlights.scss";

const PhotograpgherHighlights = ({ likes, price }) => {
	const heartIcon = <FontAwesomeIcon icon={faHeart} />;

	return (
		<div className="highlight-box">
			<div className="total-likes">
				<p className="user-likes">{likes}</p>
				<span>{heartIcon}</span>
			</div>
			<p>€{price}/jour</p>
		</div>
	);
};

export default PhotograpgherHighlights;
