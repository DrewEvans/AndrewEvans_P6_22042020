import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import "./loadingspinner.scss";

const LoadingSpinner = () => {
	const element = (
		<FontAwesomeIcon className="animation" icon={faCircleNotch} />
	);
	return <div className="spinner-wrapper">{element}</div>;
};

export default LoadingSpinner;
