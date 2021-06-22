import { useState } from "react";
import { Link } from "react-router-dom";
import "./jumpToContent.scss";

const JumpToContent = () => {
	const [showScroll, setShowScroll] = useState(false);
	const checkScrollTop = () => {
		if (!showScroll && window.pageYOffset > 100) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= 100) {
			setShowScroll(false);
		}
	};
	window.addEventListener("scroll", checkScrollTop);

	const backToMain = (e) => {
		window.scrollTo(0, 100);
	};

	if (showScroll) {
		return (
			<button onClick={backToMain} className="jump-content">
				Passer Au Contenu
			</button>
		);
	}
	return null;
};

export default JumpToContent;
