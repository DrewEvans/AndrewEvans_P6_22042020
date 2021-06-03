import { NavLink } from "react-router-dom";
import "./logo.scss";

const Logo = () => {
	return (
		<NavLink to="/">
			<div className="logo-container">
				<img src="../assets/fisheye-logo.png" alt="" />
			</div>
		</NavLink>
	);
};

export default Logo;
